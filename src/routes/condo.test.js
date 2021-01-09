const req = require('supertest')
const { connect, disconnect, cleanup } = require('../db')
const app = require('../app')
const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Condo = require('../models/condo.model')

let token =  undefined
let admin = undefined

describe('Condo route', () => {
  beforeAll(async () => await connect())
  beforeEach(async () => {
    await cleanup()
    const user = {
      name: 'Alejandro',
      lastName: 'Alfaro',
      idNumber: '1038757637',
      phone: '3507388888',
      email: 'alejo0226@gmail.com',
      password: '12345',
    }

    const encPassword = await bcrypt.hash(user.password, 8)
    admin = await Admin.create({...user, password: encPassword})
    token = jwt.sign(
      { id: admin._id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    ) 
  })
  afterAll(async () => await disconnect())

  const condo = {
    name: 'condo 1',
    address: '5th Avenue, NYC',
    admin: '',
    unitIds: [],
    residentIds: [],
  }
  
  it('should create a condo', async () => {
    const res = await req(app).post('/condo')
      .send(condo)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toMatch(/condo created/i)
    expect(res.body.condo.admin).toMatch(admin._id.toString())
  })

  it('should not create condo when address is missing', async () => {
    const res = await req(app).post('/condo')
      .send({ ...condo, address: '' })
      .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toMatch(/something went wrong/i)
  })

  it('should update an existing condo', async () => {
    const newCondo = await Condo.create({ ...condo, admin: admin._id })
    const update = { address: '6th Avenue West' }

    const res = await req(app).put(`/condo/${newCondo._id}`)
      .send(update)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/condo updated/i)
    expect(res.body.data[Object.keys(update)[0]]).toMatch(update.address)
  })
})
const req = require('supertest')
const { connect, disconnect, cleanup } = require('../db')
const app = require('../app')
const Admin = require('../models/admin.model')
const Condo = require('../models/condo.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let token =  undefined
let admin = undefined
let condo = undefined

const user = {
  name: 'Alejandro',
  lastName: 'Alfaro',
  idNumber: '1038757637',
  phone: '3507388888',
  email: 'alejo0226@test.com',
  password: '12345',
}
const newCondo = {
  name: 'condo 1',
  address: '5th Avenue, NYC',
  admin: '',
  unitIds: [],
  residentIds: [],
}


describe('Service route', () => {
  beforeAll(async () => await connect())
  beforeEach(async () => {
    await cleanup()
    
    const encPassword = await bcrypt.hash(user.password, 8)
    admin = await Admin.create({...user, password: encPassword})
    token = jwt.sign(
      { id: admin._id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    )
    condo = await Condo.create({...newCondo, admin: admin._id})
  })
  afterAll(async () => await disconnect())

  it('should create a service', async () => {
    const newService = {
      name: 'Administración',
      value: '80000',
      condo: condo._id
    }
    const res = await req(app).post('/service')
      .send(newService)
      .set('Authorization', `Bearer ${token}`)
    
      expect(true).toBe(true)
    expect(res.statusCode).toBe(201)
    expect(res.body.message).toMatch(/service created/i)
  })
  
})
const req = require('supertest')
const { connect, disconnect, cleanup } = require('../db')
const app = require('../app')
const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Condo = require('../models/condo.model')
const Unit = require('../models/unit.model')

let token =  undefined
let admin = undefined
let condo = undefined
let unit = undefined

const user = {
  name: 'Alejandro',
  lastName: 'Alfaro',
  idNumber: '1038757637',
  phone: '3507388888',
  email: 'alejo0226@gmail.com',
  password: '12345',
}
const newCondo = {
  name: 'condo 1',
  address: '5th Avenue, NYC',
  admin: '',
  unitIds: [],
  residentIds: [],
}
const newUnit = {
  name: 'Apartamento 201',
  condoId: '',
}

describe('Unit route', () => {
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
    
    unit = await Unit.create({...newUnit, condoId: condo._id})
  })
  afterAll(async () => await disconnect())

  it('should not create unit when name is taken by another unit from the same condo', async () => {
    const anotherUnit = {
      name: 'Apartamento 201',
      condoId: condo._id
    }
    const res = await req(app).post('/unit')
      .send(anotherUnit)
      .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(400)
    expect(res.body.data).toMatch(/la unidad ya existe/i)
  })

  it('should create unit when name isn\'t taken by another unit from the same condo', async () => {
    const anotherUnit = {
      name: 'Apartamento 202',
      condoId: condo._id
    }
    const res = await req(app).post('/unit')
      .send(anotherUnit)
      .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(201)
    expect(res.body.data.name).toMatch(anotherUnit.name)
    expect(res.body.message).toMatch(/unit created/i)
  })
  it('should create unit when name is taken by another unit from another condo', async () => {
    const anotherCondo = {
      name: 'condo 1',
      address: '5th Avenue, NYC',
      admin: '',
      unitIds: [],
      residentIds: [],
    }
    const otherCondo = await Condo.create({...anotherCondo, admin: admin._id})
    const anotherUnit = {
      name: 'Apartamento 201',
      condoId: otherCondo._id
    }
    const res = await req(app).post('/unit')
      .send(anotherUnit)
      .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(201)
    expect(res.body.data.name).toMatch(anotherUnit.name)
    expect(res.body.message).toMatch(/unit created/i)
  })
})
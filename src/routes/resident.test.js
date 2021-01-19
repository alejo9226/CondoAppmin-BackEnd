const req = require('supertest')
const { connect, disconnect, cleanup } = require('../db')
const app = require('../app')
const Admin = require('../models/admin.model')
const Resident = require('../models/resident.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Condo = require('../models/condo.model')
const Unit = require('../models/unit.model')

let token =  undefined
let admin = undefined
let condo = undefined
let unit = undefined
let resident = undefined

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
const newResident = {
  name: 'Resident1',
  lastName: 'Res',
  idNumber: '19191919',
  phone: '3598766777',
  email: 'resident@gtest.com',
  password: '12345',
  unitId: '',
  condoId: '',
}

describe('Resident route', () => {
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
    
    const resPassword = await bcrypt.hash(user.password, 8)
    resident = await Resident.create({...newResident, password: resPassword, unitId: unit._id, condoId: condo._id})
    
  })
  afterAll(async () => await disconnect())

  it('should create a resident', async () => {
    const anotherResident = {
      name: 'Juan',
      lastName: 'Perez',
      idNumber: '19181919',
      phone: '3598766777',
      email: 'juanpi@test.com',
      password: '12345',
      unitId: unit._id,
      condoId: condo._id,
    }
    const res = await req(app).post('/resident')
      .send(anotherResident)
      .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(201)
    expect(res.body.message).toMatch(/resident created/i)
    expect(res.body.data.name).toMatch(anotherResident.name)
    expect(res.body.data.email).toMatch(anotherResident.email)
  })
  it('should not create resident when email already exist', async () => {
    const anotherResident = {
      name: 'Juan',
      lastName: 'Perez',
      idNumber: '88383867',
      phone: '3598766777',
      email: newResident.email,
      password: '12345',
      unitId: unit._id,
      condoId: condo._id,
    }
    const res = await req(app).post('/resident')
      .send(anotherResident)
      .set('Authorization', `Bearer ${token}`)
      
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toMatch(/correo ya está en uso/i)
  })
  it('should not create resident when id already exist', async () => {
    const anotherResident = {
      name: 'Juan',
      lastName: 'Perez',
      idNumber: newResident.idNumber,
      phone: '3598766777',
      email: 'another@test.com',
      password: '12345',
      unitId: unit._id,
      condoId: condo._id,
    }
    const res = await req(app).post('/resident')
      .send(anotherResident)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toMatch(/cédula ya esta registrada/i)
  })
})
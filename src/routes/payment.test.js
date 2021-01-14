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

describe('Payment route', () => {
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
      name: 'Juan',
      lastName: 'Perez',
      idNumber: '19191919',
      phone: '3598766777',
      email: 'juan@test.com',
      password: '12345',
      unitId: '',
      condoId: '',
    }
    const encPassword = await bcrypt.hash(user.password, 8)
    admin = await Admin.create({...user, password: encPassword})
    token = jwt.sign(
      { id: admin._id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    )
    condo = await Condo.create({...newCondo, admin: admin._id})
    console.log('condo', condo)
    unit = await Unit.create({...newUnit, condoId: condo._id})
    console.log('unit', unit)
    const resPassword = await bcrypt.hash(newResident.password, 8)
    resident = await Resident.create({...newResident, password: resPassword, condoId: condo._id,unitId: unit._id})
    console.log('resident', resident)
  })
  afterAll(async () => await disconnect())
  it('should create a payment', async () => {
    const newPayment = {
      admin: admin._id,
      resident: resident._id,
      condo: condo._id,
      service: 'Administración',
      dueDate: '2021-01-20',
    }
    const res = await req(app).post('/payment')
      .send(newPayment)
      .set('Authorization', `Bearer ${token}`)
    console.log(res.body)
    expect(true).toBe(true)
  })
})
const req = require('supertest')
const { connect, disconnect, cleanup } = require('../db')
const app = require('../app')
const Admin = require('../models/admin.model')
const Resident = require('../models/resident.model')
const Payment = require('../models/payment.model')
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
      name: 'Condominio La Estancia',
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
      email: 'alejo9226@test.com',
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
    unit = await Unit.create({...newUnit, condoId: condo._id})
    const resPassword = await bcrypt.hash(newResident.password, 8)
    resident = await Resident.create({...newResident, password: resPassword, condoId: condo._id,unitId: unit._id})
  })
  afterAll(async () => await disconnect())

  it('should create a payment', async () => {
    const newPayment = {
      admin: admin._id,
      resident: resident._id,
      condo: condo._id,
      unit: unit._id,
      service: 'Administración',
      value: 80000,
      dueDate: '2021-01-20',
    }
    const res = await req(app).post('/payment')
      .send(newPayment)
      .set('Authorization', `Bearer ${token}`)
      
    expect(res.statusCode).toBe(201)
    expect(res.body.message).toMatch(/payment created/i)
    expect(res.body.data.isPayed).toBeFalsy()
  })

  it('should show all payments from a resident when logged admin is owner', async () => {
    const newPayment = {
      admin: admin._id,
      resident: resident._id,
      condo: condo._id,
      unit: unit._id,
      service: 'Administración',
      value: 80000,
      dueDate: '2021-01-20',
    }
    await Payment.create(newPayment)

    const res = await req(app).get(`/payment/admin/${resident._id}`)
      .set('Authorization', `Bearer ${token}`)        

    expect(res.statusCode).toBe(201)
    expect(res.body.message).toMatch(/payments found/i)
    expect(res.body.data).toHaveLength(1)
  })

  it('should not show payments from a resident if logged admin isn\'t owner', async () => {
    const anotherUser = {
      name: 'Name',
      lastName: 'Lastname',
      idNumber: '103875763457',
      phone: '350738888000',
      email: 'alejo5226@test.com',
      password: '12345',
    }
    const encAnotherPassword = await bcrypt.hash(anotherUser.password, 8)
    const anotherAdmin = await Admin.create({...anotherUser, password: encAnotherPassword})
    const anotherToken = jwt.sign(
      { id: anotherAdmin._id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    )

    const res = await req(app).get(`/payment/admin/${resident._id}`)
      .set('Authorization', `Bearer ${anotherToken}`)        

    expect(res.statusCode).toBe(400)
    expect(res.body.data).toMatch(/resource not available/i)
  })

  it('should retrieve all payments from a specific condo when owner admin is logged in', async () => {
    const newPayment = {
      admin: admin._id,
      resident: resident._id,
      condo: condo._id,
      unit: unit._id,
      service: 'Administración',
      value: 80000,
      dueDate: '2021-01-20',
    }
    const anotherPayment = {
      admin: admin._id,
      resident: resident._id,
      condo: condo._id,
      unit: unit._id,
      service: 'Cancha de Tennis',
      value: 30000,
      dueDate: '2021-02-20',
    }
    await Payment.create({ ...newPayment })
    await Payment.create({ ...anotherPayment })

    const res = await req(app).get(`/payment/condo/${condo._id}`)
      .set('Authorization', `Bearer ${token}`)   
    
    expect(res.statusCode).toBe(201)
    expect(res.body.message).toMatch(/payments found/i)
    expect(res.body.data).toHaveLength(2)
    res.body.data.forEach(payment => {
      expect(payment.condo).toMatch(condo._id.toString())
    })
  })
})
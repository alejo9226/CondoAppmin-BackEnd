const req = require('supertest')
const { connect, disconnect, cleanup } = require('../db')
const app = require('../app')
const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

describe('Admin route', () => {
  beforeAll(async () => await connect())
  beforeEach(async () => await cleanup())
  afterAll(async () => await disconnect())

  const user = {
    name: 'Alejandro',
    lastName: 'Alfaro',
    idNumber: '1038757637',
    phone: '3507388888',
    email: 'alejo0226@gmail.com',
    password: '12345',
  }

  it('should create an admin correctly', async () => {

    const res = await req(app).post('/admin/signup').send(user)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    expect(res.body.message).toMatch(/cuenta creada exitosamente/i)
  })

  it('should not create admin when there is no email', async () => {
    const user = {
      name: 'Alejandro',
      lastName: 'Alfaro',
      idNumber: '10387657637',
      phone: '3507388888',
      password: '12345',
    }
    const res = await req(app).post('/admin/signup').send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body.token).toBeUndefined()
    expect(res.body.message).toMatch(/`email` is required/i)
  })

  it('should not create admin when email and id already exist', async () => {
   
    await Admin.create(user)
    const res = await req(app).post('/admin/signup').send(user)

    expect(res.statusCode).toBe(400)
    expect(res.body.token).toBeUndefined()
    expect(res.body.message).toMatch(/correo ya está en uso/i)
    expect(res.body.message).toMatch(/cédula ya esta registrada/i)
  })

  it('should not create admin when email is invalid', async () => {
    const res = await req(app).post('/admin/signup').send({ ...user, email: 'alejo0226'})

    expect(res.statusCode).toBe(400)
    expect(res.body.token).toBeUndefined()
    expect(res.body.message).toMatch(/email is not valid/i)
  })

  it('should signin user correctly', async () => {
    
    const encPassword = await bcrypt.hash(user.password, 8)
    await Admin.create({...user, password: encPassword})
    const res = await req(app).post('/admin/signin').send({ email: user.email, password: user.password })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body).toHaveProperty('name')
    expect(res.body.name).toMatch(user.name)
  })

  it('should not sign in admin when password is incorrect', async () => {
    
    const encPassword = await bcrypt.hash(user.password, 8)
    await Admin.create({...user, password: encPassword})
    const res = await req(app).post('/admin/signin').send({ email: user.email, password: '1234' })

    expect(res.statusCode).toBe(401)
    expect(res.body.token).toBeUndefined()
    expect(res.body.name).toBeUndefined()
  })

  it('should not sign in admin when email does not exist', async () => {
    
    const encPassword = await bcrypt.hash(user.password, 8)
    await Admin.create({...user, password: encPassword})
    const res = await req(app).post('/admin/signin').send({ email: 'alejo9226@gmail.com', password: user.password })

    expect(res.statusCode).toBe(401)
    expect(res.body.token).toBeUndefined()
    expect(res.body.name).toBeUndefined()
    expect(res.body.message).toMatch(/usuario o contraseña invalida/i)
  })

  it('should show admin\'s info if authenticated', async () => {
   
    const encPassword = await bcrypt.hash(user.password, 8)
    const admin = await Admin.create({...user, password: encPassword})
    const token = jwt.sign(
      { id: admin._id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 }
    )
    const res = await req(app)
      .get('/admin')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toMatch(/admin found/)
    expect(res.body.name).toBe(admin.name)
    expect(res.body.email).toBe(admin.email)
    expect(res.body.id).toBe(admin._id.toString())
  })

  it('should not show any admin\'s info if token is empty', async () => {
   
    const encPassword = await bcrypt.hash(user.password, 8)
    await Admin.create({...user, password: encPassword})

    const res = await req(app)
      .get('/admin')
      .set('Authorization', `Bearer `)

    expect(res.statusCode).toBe(401)
    expect(res.body.message).toMatch(/su sesión expiró/i)
  })

  it('should not show any admin\'s info if incorrect token sent', async () => {
   
    const encPassword = await bcrypt.hash(user.password, 8)
    await Admin.create({...user, password: encPassword})

    const res = await req(app)
      .get('/admin')
      .set('Authorization', `Bearer 12345`)
    
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toMatch(/jwt malformed/i)
  })

  it('should not show any admin\'s info if user isn\'t logged in', async () => {
   
    const encPassword = await bcrypt.hash(user.password, 8)
    await Admin.create({...user, password: encPassword})

    const res = await req(app)
      .get('/admin')
    
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toMatch(/su sesión expiró/i)
  })
})
const req = require('supertest')
const { connect, disconnect, cleanup } = require('./db')
const mongoose = require('mongoose')
const app = require('./app')

describe('App', () => {
  beforeAll(async () => await connect())
  beforeEach(async () => {
     await cleanup()
  })
  afterAll(async () => await disconnect())

  it('should connect', () => {
    expect(true).toBeTruthy()
  })
})
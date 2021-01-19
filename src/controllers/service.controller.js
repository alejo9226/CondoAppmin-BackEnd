const Service = require('../models/service.model')
require('dotenv').config()

module.exports = {
  async create (req, res) {
    const { body } = req
    try {
      const service = await Service.create({...body})
      res.status(201).json({message: 'Service created', data: service})
    } catch (err) {
      res.status(400).json({message: 'Service not created', data: err.message})
    }
  }
}
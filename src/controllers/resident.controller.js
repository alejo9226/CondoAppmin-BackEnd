const Resident = require('../models/resident.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async create(req, res) {
    try {
      const { password } = req.body
      const encPassword = await bcrypt.hash(password, 8)
      const resident = await Resident.create({
        ...req.body,
        password: encPassword,
      })
      res.status(201).json({ message: 'Resident Created!', data: resident })
    } catch (err) {
      res.status(400).json({
        message: 'Something was wrong! Resident not created',
        data: err,
      })
    }
  },
  async list(req, res) {
    try {
      const residentId = req.user
      const resident = await Resident.findOne({ _id: residentId })
      res.status(200).json({
        message: 'Resident found',
        id: resident._id,
        name: resident.name,
        email: email,
      })
    } catch (err) {
      res.status(400).json({ message: 'Residents not found', data: err })
    }
  },

  async foundEmail(req, res) {
    try {
      const residentEmail = req.user
      const resident = await Resident.findOne({ email: residentEmail })
      res.status(200).json({
        message: 'Email found',
        id: resident._id,
      })
    } catch (err) {
      res.status(400).json({ message: 'Email not found', data: err })
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body
      const resident = await Resident.findOne({ email })

      if (!resident) {
        throw new Error('Usuario o contraseña invalida')
      }

      const isValid = await bcrypt.compare(password, resident.password)

      if (!isValid) {
        throw new Error('Usuario o contraseña invalida')
      }

      const token = jwt.sign(
        {
          id: resident._id,
        },
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      )

      res.status(200).json({ token, name: resident.name })
    } catch (err) {
      res.status(401).json({ message: err.message })
    }
  },
}

const Payment = require("../models/payment.model");
const Admin = require('../models/admin.model');
const Condo = require('../models/condo.model');
const { transporter, residentPayment } = require("../utils/mailer");
const Resident = require("../models/resident.model");


module.exports = {
  async create(req, res) {
    const { body, user } = req
    try  {
      const condo = await Condo.findOne({_id: body.condo})
      if (!condo) {
        throw new Error('Missing info')
      }
      
      const resident = await Resident.findOne({_id: body.resident})
      if(!resident) {
        throw new Error('Missing info')
      }

      const payment = await Payment.create({ ...body, admin: user})

      await transporter.sendMail(residentPayment(resident.name, resident.email, condo.name, payment.service, 'Enero', payment.dueDate))

      res.status(201).json({ message: "Payment created", data: payment });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong!", data: err.message });      
    }
  },
  async showResidentPayments (req, res) {
    const { user, params } = req
    try {
      const { residentid } = params

      const admin = await Admin.findOne({_id: user})
      const resident = await Resident.findOne({ _id: residentid })

      const payments = await Payment.find({ resident: residentid }).populate('resident', 'condoId')

      const condoid = resident.condoId.toString()

      const allowed = admin.condoIds.find(condo => condo.toString() === condoid)

      if (!allowed) {
        throw new Error('Resource not available')
      } 

      res.status(201).json({ message: "Payments found", data: payments})
    } catch (err) {
      res.status(400).json({ message: "Something went wrong!", data: err.message });      
      
    }
  },
  async showCondoPayments (req, res) {
    const { user, params } = req
    try {
      const { condoid } = params

      const payments = await Payment.find({ condo: condoid, admin: user })

      res.status(201).json({ message: "Payments found", data: payments})
    } catch (err) {
      res.status(400).json({ message: "Something went wrong!", data: err.message });      
    }
  }
}
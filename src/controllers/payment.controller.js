const Payment = require("../models/payment.model");
const Admin = require('../models/admin.model');
const Condo = require('../models/condo.model');
const { transporter, residentPayment, residentPaymentReminder } = require("../utils/mailer");
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
      console.log('err.message', err.message)
      res.status(400).json({ message: "Something went wrong!", data: err.message });      
    }
  },
  async showResidentPayments (req, res) {
    const { user, params } = req
    try {
      const { residentid, usertype } = params
      if (usertype !== 'admin' && usertype !== 'resident') {
        throw new Error('Resource not available')
      } else if (usertype === 'admin') {
        const admin = await Admin.findOne({_id: user})
        const resident = await Resident.findOne({ _id: residentid })

        const payments = await Payment.find({ resident: residentid })

        const condoid = resident.condoId.toString()

        const allowed = admin.condoIds.find(condo => condo.toString() === condoid)
        
        if (!allowed) {
          throw new Error('Resource not available')
        } 
        res.status(201).json({ message: "Payments found", data: payments})
      } else if(usertype === 'resident') {
        const payments = await Payment.find({ resident: user })
        res.status(201).json({ message: "Payments found", data: payments})
      }
    } catch (err) {
      res.status(400).json({ message: "Something went wrong!", data: err.message });      
      
    }
  },
  async showCondoPayments (req, res) {
    const { user, params } = req
    try {
      const { condoid } = params

      const payments = await Payment.find({ condo: condoid, admin: user }).populate('unit', 'name').populate('resident', 'name lastName')

      res.status(201).json({ message: "Payments found", data: payments})
    } catch (err) {
      res.status(400).json({ message: "Something went wrong!", data: err.message });      
    }
  },
  async showSinglePayment (req, res) {
    const { user, params } = req
    const { usertype, paymentid } = params
    try {
      if (usertype !== 'admin' && usertype !== 'resident') {
        throw new Error('Resource not available')
      } else if (usertype === 'admin') {
        const payment = await Payment.findOne({ _id: paymentid, admin: user }).populate('unit', 'name').populate('resident', 'name lastName')
        if (!payment) throw new Error('Resource not available')
        res.status(201).json({ message: 'Payment found', data: payment})
      } else if (usertype === 'resident') {
        const payment = await Payment.findOne({ _id: paymentid, resident: user }).populate('unit', 'name')
        if (!payment) throw new Error('Resource not available')
        res.status(201).json({ message: 'Payment found', data: payment})
      }
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong!', data: err.message})
    }
  },
  async isPayed (req, res) {
    try {
      const { params, user } = req
      const { paymentid } = params

      const updatedPayment = await Payment.findOneAndUpdate({ _id: paymentid, resident: user}, { isPayed: true }, { new: true })

      if (!updatedPayment) throw new Error('Resource not available')
      
      res.status(201).json({ message: 'Payment updated', data: updatedPayment})
    } catch (err) {
      res.status(400).json({ message: 'Payment not updated', data: err.message})
    }
  },
  async sendEmailReminder (req, res) {
    try {
      const { params, user, body } = req
      const { paymentid } = params
      const { message } = body

      const admin = await Admin.findOne({_id: user})
      const payment = await Payment.findOne({ _id: paymentid })
      const resident = await Resident.findOne({ _id: payment.resident }).populate('condoId', 'name')
      const condoid = resident.condoId._id.toString()
      const condoName = resident.condoId.name
      
      const allowed = admin.condoIds.find(condo => condo.toString() === condoid)
      if (!allowed) {
        throw new Error('Resource not available')
      }
      
      const sentEmail = await transporter.sendMail(residentPaymentReminder(condoName, resident, payment, message))

      if (sentEmail.response.search(/ok/i) === -1) {
        throw new Error('Resource not available')
      }
      
      res.status(201).json({ message: 'Email sent' })
    } catch (err) {
      res.status(400).json({ message: 'Email not sent', data: err.message })

    }
  }
}
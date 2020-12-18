const SubTicket = require('../models/subTicket.model')

module.exports = {
  async create(req, res) {
    const data = req.body
    try {
      const subTicket = await SubTicket.create(data)
      res.status(201).json({ message: 'subTicket created!', data: subTicket })
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong!', data: err })
    }
  },
  async list(req, res) {
    try {
      const thisId = req.body.thisId
      const subTickets = await SubTicket.find({ ticketFather: thisId })
      res.status(200).json({
        message: 'SubTickets found',
        data: subTickets,
      })
    } catch (err) {
      res.status(400).json({ message: 'Email not found', data: err })
    }
  },
}

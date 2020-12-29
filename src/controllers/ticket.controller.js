const Ticket = require('../models/ticket.model')
const { show } = require('./unit.controller')

module.exports = {
  async create(req, res) {
    const data = req.body
    try {
      const ticket = await Ticket.create(data)
      res.status(201).json({ message: 'Ticket created!', data: ticket })
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong!', data: err })
    }
  },
  async list(req, res) {
    try {
      const tickets = await Ticket.find()
      res.status(200).json({ message: 'Tickets found', data: tickets })
    } catch (err) {
      res.status(400).json({ message: 'Tickets NOT found', data: err })
    }
  },
  async show(req, res) {
    try {
      const { adminid } = req.params

      if (Object.keys(req.query).length > 0 ) {
        
        if (Object.keys(req.query).includes('read')) {
          const { read } = req.query
          var tickets = await Ticket.find({ to: adminid, read: read })
        } else {
          throw new Error('Resource unavailable')
        }

      } else {
        var tickets = await Ticket.find({ to: adminid })
      }
      res.status(200).json({ message: 'Tickets found', data: tickets })

    } catch (err) {
      res.status(400).json({ message: 'Tickets could not be found', data: err })
    }
  },

  async update(req, res) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        { _id: req.body._id },
        {
          read: true,
        }
      )
      res.status(200).json({ message: 'Ticket Read', data: ticket })
    } catch (err) {
      res.status(400).json({ message: 'Ticket could not be updated' })
    }
  },
  async deleteAll (req, res) {
    try {
      const { adminid } = req.params

      const deletedTickets = await Ticket.deleteMany({})
      res.status(200).json({ message: 'Tickets deleted', data: deletedTickets })

    } catch (err) {
      res.status(400).json({ message: 'Tickets could not be deleted' })
    }
  }
}

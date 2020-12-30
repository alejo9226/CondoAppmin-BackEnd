const Ticket = require('../models/ticket.model')

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
  async selected(req, res) {
    try {
      const ticket = await Ticket.findOne({ _id: req.body._id })
      res.status(200).json({
        message: 'ticket found',
        data: ticket,
      })
    } catch (err) {
      res.status(400).json({ message: 'ticket not found', data: err })
    }
  },
  async showAdminTicketsByCondo(req, res) {
    try {
      const { adminid, condoid } = req.params
      if (Object.keys(req.query).length > 0 ) {
        
        if (Object.keys(req.query).includes('read')) {
          const { read } = req.query
          var tickets = await Ticket.find({ to: adminid, condoId: condoid , read: read })
        } else {
          throw new Error('Resource unavailable')
        }

      } else {
        var tickets = await Ticket.find({ to: adminid, condoId: condoid })
      }
      res.status(200).json({ message: 'Tickets found', data: tickets })

    } catch (err) {
      res.status(400).json({ message: 'Tickets could not be found', data: err })
    }
  },
  async showResidentTickets(req, res) {
    try {
      const { residentemail } = req.params
      if (Object.keys(req.query).length > 0 ) {
        
        if (Object.keys(req.query).includes('read')) {
          const { read } = req.query
          var tickets = await Ticket.find({ from: residentemail, read: read })
        } else {
          throw new Error('Resource unavailable')
        }

      } else {
        var tickets = await Ticket.find({ from: residentemail })
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

  async updateReadFalse(req, res) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        { _id: req.body._id },
        {
          read: false,
        }
      )
      res.status(200).json({ message: 'Ticket Read', data: ticket })
    } catch (err) {
      res.status(400).json({ message: 'Ticket could not be updated' })
    }
  },

  async updateState(req, res) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        { _id: req.body._id },
        {
          ticketState: false,
        }
      )
      res.status(200).json({ message: 'Ticket closed', data: ticket })
    } catch (err) {
      res.status(400).json({ message: 'Ticket could not be closed' })
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

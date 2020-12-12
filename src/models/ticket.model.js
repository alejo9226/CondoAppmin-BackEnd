const { model, Schema } = require('mongoose')

const ticketSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    ref: 'Resident',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
  ticketState: {
    type: Boolean,
    required: true,
  },
})

const Ticket = model('Ticket', ticketSchema)

module.exports = Ticket

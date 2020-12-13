const { model, Schema } = require('mongoose')

const subTicketSchema = new Schema({
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
  ticketFather: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
})

const subTicket = model('subTicket', subTicketSchema)

module.exports = subTicket

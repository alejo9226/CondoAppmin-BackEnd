const { model, Schema } = require('mongoose')

const ticketSchema = new Schema({
  ref: { type: Number, required: true },
  isSolved: { type: Boolean, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  body: { type: String, required: true },
  files: { type: String, required: false },
  from: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
  to: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },

})

const Ticket = model('Ticket', ticketSchema)

module.exports = Ticket
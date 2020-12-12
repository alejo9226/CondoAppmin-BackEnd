const { model, Schema } = require('mongoose')

const subticketSchema = new Schema({
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
})

const subTicket = model('subTicket', subticketSchema)

module.exports = subTicket

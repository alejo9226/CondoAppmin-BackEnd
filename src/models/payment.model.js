const { model, Schema, models } = require('mongoose')

const paymentSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Resident",
    required: true
  },
  resident: {
    type: Schema.Types.ObjectId,
    ref: "Resident",
    required: true
  },
  condo: {
    type: Schema.Types.ObjectId,
    ref: "Condo",
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  isPayed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    required: true
  },
}, {
  timestamps: true,
})

const payment = model('payment', paymentSchema)
module.exports = payment
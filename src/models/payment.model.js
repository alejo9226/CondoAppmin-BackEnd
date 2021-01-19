const { model, Schema, models } = require('mongoose')

const paymentSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
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
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
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

const Payment = model('Payment', paymentSchema)
module.exports = Payment
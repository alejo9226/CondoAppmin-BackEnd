const { model, Schema } = require('mongoose')
const { schema } = require('./admin.model')

const residentSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  idNumber: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
})

const Resident = model('Resident', residentSchema)

module.exports = Resident

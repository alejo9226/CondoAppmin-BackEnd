const { model, Schema } = require('mongoose')

const residentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  unitId: {
    type: String,
    required: true,
    // type: Schema.Types.ObjectId,
    // ref: "Unit",
  },
})

const Resident = model('Resident', residentSchema)

module.exports = Resident

const { model, Schema } = require('mongoose')

const adminSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  idNumber: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  condoIds: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Condo', required: true }],
  },
})

const Admin = model('Admin', adminSchema)

module.exports = Admin

const { model, Schema } = require('mongoose')

const notificationSchema = new Schema({
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  body: { type: String, required: true },
  files: { type: String, required: false },
  from: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  to: { type: [{ type: Schema.Types.ObjectId, ref: 'Resident', required: true }]  },

})

const Nofication = model('Nofication', notificationSchema)

module.exports = Nofication
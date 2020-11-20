const { model, Schema } = require('mongoose')

const messageSchema = new Schema({
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  isRead: { type: Boolean, required: true },
  body: { type: String, required: true },
  files: { type: String, required: false },
  from: { type: Schema.Types.ObjectId, ref: 'Resident', required: true },
  to: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
})

const Message = model('Message', messageSchema)

module.exports = Message

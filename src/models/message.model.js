const { model, Schema } = require('mongoose')

const messageSchema = new Schema({
  subject: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  body: { 
    type: String, 
    required: true 
  },
  files: { 
    type: String, 
    required: false 
  },
  from: { 
    type: String, 
    ref: 'Admin', 
    required: true 
  },
  to: { 
    type: Schema.Types.ObjectId, 
    ref: 'Resident', 
    required: true 
  },
  read: { 
    type: Boolean, 
    required: true 
  },
})

const Message = model('Message', messageSchema)

module.exports = Message

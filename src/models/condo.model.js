const { model, Schema } = require('mongoose')

const condoSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  admin: { 
    type: Schema.Types.ObjectId, 
    ref: 'Admin', 
    required: true 
  },
})

const Condo = model('Condo', condoSchema)

module.exports = Condo

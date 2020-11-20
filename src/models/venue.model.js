const { model, Schema } = require('mongoose')

const venueSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  schedule: { 
    type: String, 
    required: true 
  }, 
  condoId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Condo', 
    required: true 
  },
})

const Venue = model('Venue', venueSchema)

module.exports = Venue

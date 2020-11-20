const { model, Schema } = require('mongoose')

const venueAvailabilitySchema = new Schema({
  availability: { 
    type: Boolean, 
    required: true 
  },
  venue: { 
    type: Schema.Types.ObjectId, 
    ref: 'Venue', 
    required: true 
  },
})

const venueAvailability = model('venueAvailability', venueAvailabilitySchema)

module.exports = venueAvailability
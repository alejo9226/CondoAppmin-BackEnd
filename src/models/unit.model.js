const { model, Schema } = require('mongoose')

const unitSchema = new Schema({
  name: { type: String, required: true },
  condoId: { type: Schema.Types.ObjectId, ref: 'Condo', required: true },
})

const Unit = model('Unit', unitSchema)

module.exports = Unit

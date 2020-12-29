const { model, Schema, models } = require('mongoose')

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
  unitIds: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },
}, {
  timestamps: true,
})

condoSchema.post('findOneAndDelete', async function(doc) {
  
  const admin = await models.Admin.findByIdAndUpdate(doc.admin)
  admin.condoIds.pop()
  await admin.save({ validateBeforeSave: false })

  const units = await models.Unit.deleteMany({ condoId: doc._id })
})

condoSchema.pre('save', async function() {
  if (this.admin && this.isModified('admin')) {
    const admin = await models.Admin.findById(this.admin)
    admin.condoIds.push(this)
    await admin.save({ validateBeforeSave: false })
  }
})

const Condo = model('Condo', condoSchema)

module.exports = Condo

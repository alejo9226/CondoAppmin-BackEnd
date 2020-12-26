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
  residentIds: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resident",
      },
    ],
  },
}, {
  timestamps: true,
})

condoSchema.post('findOneAndDelete', async function(doc) {
  const condoid = JSON.stringify(doc._id)

  const admin = await models.Admin.findByIdAndUpdate(doc.admin)

  const condoToRemove = admin.condoIds.findIndex(condo => JSON.stringify(condo) === condoid)
  admin.condoIds.splice(condoToRemove, 1)
  await admin.save({ validateBeforeSave: false })

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

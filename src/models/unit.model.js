const { model, Schema, models } = require("mongoose");

const unitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  condoId: {
    type: Schema.Types.ObjectId,
    ref: "Condo",
    required: true,
  },
  resident: {
    type: Schema.Types.ObjectId,
    ref: "Resident",
  }
}, {
  timestamps: true,
})

unitSchema.post('findOneAndDelete', async function(doc) {
  const unitid = JSON.stringify(doc._id)

  const condo = await models.Condo.findByIdAndUpdate(doc.condoId)
  const condoToRemove = condo.unitIds.findIndex(unit => JSON.stringify(unit) === unitid)
  condo.unitIds.splice(condoToRemove, 1)

  await condo.save({ validateBeforeSave: false })

  if (doc.resident) {
    await models.Resident.findByIdAndDelete({ _id: doc.resident }) 
  }
})

unitSchema.pre('save', async function() {
  if (this._id) {
    const condo = await models.Condo.findById(this.condoId)
    condo.unitIds.push(this)
    await condo.save({ validateBeforeSave: false })
  }
})

const Unit = model("Unit", unitSchema);

module.exports = Unit;

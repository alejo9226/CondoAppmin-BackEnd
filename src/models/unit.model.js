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
    required: false,
  }
}, {
  timestamps: true,
})

unitSchema.post('findOneAndDelete', async function(doc) {
  const condo = await models.Condo.findByIdAndUpdate(doc.condoId)
  condo.unitIds.pop()
  await condo.save({ validateBeforeSave: false })
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

const { model, Schema, models } = require("mongoose");
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const residentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    validate: {
      async validator(idNumber) {
        try {
          const resident = await models.Resident.findOne({ idNumber });
          return !resident
        } catch (err) {
          return false
        }
      },
      message: 'Esta cédula ya esta registrada'
    }
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [emailRegex, 'email is not valid'],
    validate: {
      async validator(email) {
        try {
          const resident = await models.Resident.findOne({ email });
          return !resident;
        } catch (err) {
          return false;
        }
      },
      message: "Correo ya está en uso",
    },
  },
  password: {
    type: String,
    required: true,
  },
  unitId: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  condoId: {
    type: Schema.Types.ObjectId,
    ref: "Condo",
    required: true,
  }
})

residentSchema.post('findOneAndDelete', async function(doc) {
  const residentid = JSON.stringify(doc._id)

  const condo = await models.Condo.findByIdAndUpdate(doc.condoId)
  const residentToRemove = condo.residentIds.findIndex(resident => JSON.stringify(resident) === residentid)
  condo.residentIds.splice(residentToRemove, 1)
  await condo.save({ validateBeforeSave: false })
  
  const unit = await models.Unit.findByIdAndUpdate(doc.unitId)
  if (unit) {
    unit.resident = ''
    await unit.save({ validateBeforeSave: true })
  }
})

residentSchema.pre('save', async function() {
  if (this._id) {
    await models.Unit.findByIdAndUpdate(this.unitId, { resident: this._id })
    
    const condo = await models.Condo.findById(this.condoId)
    condo.residentIds.push(this)
    await condo.save({ validateBeforeSave: false })
  }
})

const Resident = model("Resident", residentSchema);

module.exports = Resident;

const { model, models, Schema } = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const adminSchema = new Schema({
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
          const admin = await models.Admin.findOne({ idNumber });
          return !admin
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
          const admin = await models.Admin.findOne({ email });
          return !admin;
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
  condoIds: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Condo",
      },
    ],
  },
}, {
  timestamps: true,
})

const Admin = model("Admin", adminSchema);

module.exports = Admin;

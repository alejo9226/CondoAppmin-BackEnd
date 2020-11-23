const { model, models, Schema } = require('mongoose')

const adminSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  idNumber: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    validate: {
      async validator(email) {
        try {
          console.log('entro')
          const admin = await models.Admin.findOne({ email })
          console.log('admin', admin)
          return !admin;
        } catch(err) {
          return false;
        }
      },
      message: 'Correo ya está en uso',
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  condoIds: {
    type: [{
       type: Schema.Types.ObjectId, 
       ref: 'Condo', 
       required: true 
      }],
  },
})

const Admin = model('Admin', adminSchema)

module.exports = Admin

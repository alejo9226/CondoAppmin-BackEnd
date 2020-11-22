const Admin = require('../models/admin.model')

module.exports = {
  async create(req, res) {
    const data = req.body
    console.log(data)
    try {
      const admin = await Admin.create(data)
      res.status(201).json({ message: 'Registrado satisfactoriamente', data: admin })
    }
    catch (err) {
      console.log(err)
      res.status(400).json({ message: 'admin could not be created'})

    }
  },
  list(req, res) {
    Admin.find()
    .then(admins => {
      res.status(200).json({ message: 'admins found', data: admins })
    })
  }
}
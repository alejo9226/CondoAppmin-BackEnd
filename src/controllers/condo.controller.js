const Condo = require("../models/condo.model");
const { deleteAll } = require("./message.controller");

module.exports = {
  async create(req, res) {
    const { body, user } = req
    try {
      const condo = await Condo.create({ ...body, admin: user });
      res.status(201).json({ message: "Condo created", condo: condo });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong!", data: err });
    }
  },
  async show (req, res) {
    try {
      const condo = await Condo.find({ admin: req.user });
      res.status(200).json({ message: "Condos found", data: condo });
    } catch (err) {
      res.status(400).json({ message: "Condos could not be found", data: err.message });
    }
  },
  async update (req, res) {
    const { body, user, params } = req
    try {
      const { condoid } = params
      const condo = await Condo.findOneAndUpdate({ _id: condoid, admin: user }, body, { new: true })
      if (!condo) throw new Error('Condo not found')
      res.status(200).json({ message: "Condo updated", data: condo });
      
    } catch (err) {
      res.status(400).json({ message: "Condo could not be updated" });
    }
  },
  async delete (req, res) {
    const { user, params } = req
    try {
      const { condoid } = params
      const deletedCondo = await Condo.findOneAndDelete({ _id: condoid, admin: user }) 
      res.status(200).json({ message: "Condo deleted", data: deletedCondo })

    } catch (err) {
      res.status(400).json({ message: 'Condo could not be deleted', data: err })
    }
  },
}

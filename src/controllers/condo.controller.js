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
      res.status(200).json({ message: "Condo updated", data: condo });
      
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: "Condo could not be updated" });
    }
  },
  async list (req, res) {
    const condos = await Condo.find();
    res.status(200).json({ message: "Condos found", data: condos });
  },
  async deleteAll (req, res)  {
    const deletedCondos = await Condo.deleteMany({})
    res.status(200).json({ message: "Condos deleted", data: deletedCondos });
  },
  async delete (req, res) {
    try {
      const { condoid } = req.params
      const deletedCondo = await Condo.findByIdAndDelete({ _id: condoid }) 
      res.status(200).json({ message: "Condo deleted", data: deletedCondo })

    } catch (err) {
      res.status(400).json({ message: 'Condo could not be deleted', data: err })
    }
  },
}

const Condo = require("../models/condo.model");
const { deleteAll } = require("./message.controller");

module.exports = {
  async create(req, res) {
    const data = req.body;
    try {
      const condo = await Condo.create(data);
      res.status(201).json({ message: "Condo created", data: condo });
    } catch (err) {
      res.status(400).json({ message: "Something was worng!", data: err });
    }
  },
  async list(req, res) {
    const condo = await Condo.find();
    res.status(200).json({ message: "Condos found", data: condo });
  },
  async deleteAll (req, res)  {
    const deletedCondos = await Condo.deleteMany({})
    res.status(200).json({ message: "Condos deleted", data: deletedCondos });
  }
};

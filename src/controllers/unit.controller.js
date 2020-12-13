const Unit = require("../models/unit.model");

module.exports = {
  async create(req, res) {
    const data = req.body;
    try {
      const unit = await Unit.create(data);
      res.status(201).json({ message: "Unit created", data: unit });
    } catch (err) {
      res.status(400).json({ message: "Something was wrong!", data: err });
    }
  },

  async list(req, res) {
    try {
      const unit = await Unit.find();
      res.status(200).json({ message: "Units found", data: unit });
    } catch (err) {
      res.status(400).json({ message: "Units NOT foud", data: err });
    }
  },
  async show(req, res) {
    try {
      const units = await Unit.find({condoId: req.params.condoid})
      res.status(200).json({ message: "Units found", data: units });
    } catch (err) {
      res.status(400).json({ message: "Units couldn't be find", data: err });
    }
    
  },
  async deleteAll (req, res) {
    try {
      const deletedUnits = await Unit.deleteMany({})
      res.status(200).json({ message: 'Units deleted', data: deletedUnits })
    } catch (err) {
      res.status(400).json({ message: 'Units could not be deleted', data: err })

    }
  }
};

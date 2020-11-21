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
};

const Resident = require("../models/resident.model");

module.exports = {
  async create(req, res) {
    const data = req.body;

    try {
      const resident = await Resident.create(data);
      res.status(201).json({ message: "Resident Created!", data: resident });
    } catch (err) {
      res.status(400).json({
        message: "Something was wrong! Resident not created",
        data: err,
      });
    }
  },
  async list(req, res) {
    try {
      const residents = await Resident.find();
      res.status(200).json({ message: "Residents found", data: residents });
    } catch (err) {
      res.status(400).json({ message: "Residents not foud", data: err });
    }
  },
};

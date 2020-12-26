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
      res.status(400).json({ message: "Units not found", data: err });
    }
  },
  async show(req, res) {
    try {
      const units = await Unit.find({condoId: req.params.condoid}).populate('resident', 'name lastName')
      res.status(200).json({ message: "Units found", data: units });
    } catch (err) {
      res.status(400).json({ message: "Units couldn't be found", data: err });
    }
    
  }, 
  async update (req, res) {
    try {
      const { unitid } = req.params
      const unit = await Unit.findByIdAndUpdate(unitid, req.body)
      res.status(200).json({ message: "Unit updated", data: unit });
      
    } catch (err) {
      res.status(400).json({ message: "Unit could not be updated", data: err.message });
    }
  },
  async deleteSingle (req, res) {
    try {
      const { unitid } = req.params
      const deletedUnit = await Unit.findByIdAndDelete({ _id: unitid }) 
      res.status(200).json({ message: "Unit deleted", data: deletedUnit })

    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Unit could not be deleted', data: err })
    }
  },
  async deleteAllFromCondo (req, res) {
    try {
      const { condoid } = req.params
      const deletedUnits = await Unit.deleteMany({ condoId: condoid }) 
      res.status(200).json({ message: "Units deleted", data: deletedUnits })

    } catch (err) {
      res.status(400).json({ message: 'Units could not be deleted', data: err })
    }
  },
  async deleteAll (req, res) {
    try {
      const deletedUnits = await Unit.deleteMany({}) 
      res.status(200).json({ message: "Units removed", data: deletedUnits })

    } catch (err) {
      res.status(400).json({ message: 'Units could not be removed', data: err })
    }
  }
};

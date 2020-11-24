const Admin = require("../models/admin.model");

module.exports = {
  async create(req, res) {
    const data = req.body;

    const newAdmin = {
      ...data,
    };
    console.log(newAdmin);
    try {
      const admin = await Admin.create(newAdmin);
      res.status(201).json({ message: "Admin created", data: admin });
    } catch (err) {
      res.status(400).json({ message: "Something was wrong!", error: err });
    }
  },
  list(req, res) {
    Admin.find().then((admins) => {
      res.status(200).json({ message: "admins found", data: admins });
    });
  },
};

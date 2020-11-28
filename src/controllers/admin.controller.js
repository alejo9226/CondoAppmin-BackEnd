const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  async create(req, res) {
    try {
      const { password } = req.body;
      const encPassword = await bcrypt.hash(password, 8);
      const admin = await Admin.create({ ...req.body, password: encPassword });

      const token = jwt.sign({ id: admin._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({ token, message: 'Registro exitoso' })

    } catch(err) {
      res.status(400).json({ message: err.message })
    }
  },
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
        throw new Error("Usuario o contraseña invalida");
      }

      const isValid = await bcrypt.compare(password, admin.password);

      if (!isValid) {
        throw new Error("Usuario o contraseña invalida");
      }

      const token = jwt.sign(
        { 
          id: admin._id 
        }, 
        process.env.SECRET,
          {
            expiresIn: 60 * 60 * 24,
          }
      )

      res.status(200).json({ token, name: admin.name });
    } catch (err) {
      res.status(401).json({ message: err.message });


    }
  },
  async list(req, res) {
    try {

      const adminId = req.user;
      const admin = await Admin.findOne({ _id: adminId });
      res
        .status(200)
        .json({ message: "admins found", name: admin.name, id: admin._id });

    } catch (err) {
      res.status(400).json({ message: "admins could not be found" });
    }
  },
};

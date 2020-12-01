const Message = require("../models/message.model");
const { show } = require("./unit.controller");

module.exports = {
  async create(req, res) {
    const data = req.body
    try {
      const message = await Message.create(data);
      res.status(201).json({ message: "Message created!", data: message });
    } catch (err) {
      res.status(400).json({ message: "Something was wrong!", data: err });
    }
  },
  async list(req, res) {
    try {
      const messages = await Message.find()
      res.status(200).json({ message: "Messages found", data: messages });
    } catch (err) {
      res.status(400).json({ message: "No messages found", data: err });
    }
  },
  async show(req, res) {
    try {
      const { residentid } = req.params
      const { read } = req.query
      const messages = await Message.find({ to: residentid, read: read })
      res.status(200).json({ message: "Messages found", data: messages });
    } catch (err) {
      res.status(400).json({ message: "No messages found", data: err });
    }
  },

  async update(req, res) {
    try {
      const message = await Message.findByIdAndUpdate(
        { _id: req.body._id },
        {
          read: true,
        }
      );
      res.status(200).json({ message: "Message read", data: message });
    } catch (err) {
      res.status(400).json({ message: "Message could not be updated" });
    }
  },
};

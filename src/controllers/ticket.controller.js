const Ticket = require("../models/ticket.model");

module.exports = {
  async create(req, res) {
    const data = req.body;
    try {
      const ticket = await Ticket.create(data);
      res.status(201).json({ message: "Ticket created!", data: ticket });
    } catch (err) {
      res.status(400).json({ message: "Something was wrong!", data: err });
    }
  },
  async list(req, res) {
    try {
      const ticket = await Ticket.find();
      res.status(200).json({ message: "Tickets found", data: ticket });
    } catch (err) {
      res.status(400).json({ message: "Tickets NOT found", data: err });
    }
  },

  async update(req, res) {
    const { ticketId } = req.params.id;
    console.log(req.data);
    try {
      const ticket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
        read: true,
      });
      res.status(200).json({ message: "Ticket Read", data: ticket });
    } catch (err) {
      res.status(400).json({ message: "Ticket could not be updated" });
    }
  },

  //   notesCtrl.updateNote = async (req, res) => {
  //     const { title, content, duration, date, author } = req.body;
  //     await Note.findByIdAndUpdate(req.params.id, {
  //         title,
  //         content,
  //         duration,
  //         author
  //     });
  //     res.json('Note Updated');
  // }
  // update(req, res) {
  //   const { bookId } = req.params;

  //   Book
  //     .findByIdAndUpdate(bookId, req.body, { new: true })
  //     .then(book => {
  //       res.status(200).json({ message: 'book updated', data: book })
  //     })
  //     .catch(err => {
  //       res.status(400).json({ message: 'book could not be updated' })
  //     });
  // },
};

const { create } = require("../models/condo.model");
const Payment = require("../models/payment.model");

module.exports = {
  async create(req, res) {
    const { body, user } = req
    try  {
      const payment = await Payment.create({ ...body, admin: user})
      res.status(201).json({ message: "Payment created", payment: payment });
      console.log('payment', payment)
    } catch (err) {
      console.log('err', err)
      res.status(400).json({ message: "Something went wrong!", data: err });      

    }
  }
}
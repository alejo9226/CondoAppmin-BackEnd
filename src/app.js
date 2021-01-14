const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const adminRouter = require('./routes/admin')
const morgan = require('morgan')
const app = express()
const residentRouter = require('./routes/resident')
const condoRouter = require('./routes/condo')
const unitRouter = require('./routes/unit')
const ticketRouter = require('./routes/ticket')
const subTicketRouter = require('./routes/subTicket')
const messageRouter = require('./routes/message')
const paymentRouter = require('./routes/payment')
const multiparty = require('connect-multiparty')
const cloudinary = require('cloudinary')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs')

const MultipartyMiddleware = multiparty()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/admin', adminRouter)
app.use('/resident', residentRouter)
app.use('/condo', condoRouter)
app.use('/unit', unitRouter)
app.use('/ticket', ticketRouter)
app.use('/message', messageRouter)
app.use('/subTicket', subTicketRouter)
app.use('/payment', paymentRouter)
app.post('/uploads', MultipartyMiddleware, async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.files.upload.path)
  res.status(200).json({
    uploaded: true,
    url: `${result.url}`,
  })
})

module.exports = app

const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connect } = require('./src/db')
const adminRouter = require('./src/routes/admin')
const morgan = require('morgan')
const app = express()
const residentRouter = require('./src/routes/resident')
const condoRouter = require('./src/routes/condo')
const unitRouter = require('./src/routes/unit')
const ticketRouter = require('./src/routes/ticket')
const subTicketRouter = require('./src/routes/subTicket')
const messageRouter = require('./src/routes/message')
const multiparty = require('connect-multiparty')
const cloudinary = require('cloudinary')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs')
const port = 8000

const MultipartyMiddleware = multiparty()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())
connect()
app.use(express.json())
app.use(morgan('dev'))
app.use('/admin', adminRouter)
app.use('/resident', residentRouter)
app.use('/condo', condoRouter)
app.use('/unit', unitRouter)
app.use('/ticket', ticketRouter)
app.use('/message', messageRouter)
app.use('/subTicket', subTicketRouter)
app.post('/uploads', MultipartyMiddleware, async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.files.upload.path)
  res.status(200).json({
    uploaded: true,
    url: `${result.url}`,
  })
})
<<<<<<< HEAD
=======

>>>>>>> f0650128c413311221379634ebd8db13e820433b

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`)
})

const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

function connect() {
  mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once('open', () => {
    console.log('Connection established successfully')
  })
}

module.exports = { connect }

const mongoose = require('mongoose')

function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once('open', () => {
    console.log('Connection established successfully')
  })
  mongoose.connection.once('error', (err) => {
    console.log('Something went wrong', err)
  })
<<<<<<< HEAD
=======

>>>>>>> f0650128c413311221379634ebd8db13e820433b
}

module.exports = { connect }

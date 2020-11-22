const express = require('express')
const cors = require('cors')
const { connect } = require('./src/db')
const adminRouter = require('./src/routes/admin')
const morgan = require('morgan')
const app = express()

const port = 8000

connect()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/admin', adminRouter)

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`)
})
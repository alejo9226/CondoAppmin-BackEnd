const { connect, disconnect } = require('./db')
const { verify, transporter } = require('./utils/mailer')
const app = require('./app')

const port = 8000 || process.env.PORT
  
connect()
verify(transporter)

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`)
})

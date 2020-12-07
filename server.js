const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const adminRouter = require("./src/routes/admin");
const morgan = require("morgan");
const app = express();
const residentRouter = require("./src/routes/resident");
const condoRouter = require("./src/routes/condo");
const unitRouter = require("./src/routes/unit");
const ticketRouter = require("./src/routes/ticket");
const messageRouter = require("./src/routes/message");

const port = process.env.PORT || 8000;

app.use(cors())
connect()
app.use(express.json())
app.use(morgan("dev"))
app.use("/admin", adminRouter)
app.use("/resident", residentRouter)
app.use("/condo", condoRouter)
app.use("/unit", unitRouter)
app.use("/ticket", ticketRouter)
app.use("/message", messageRouter)

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`);
});

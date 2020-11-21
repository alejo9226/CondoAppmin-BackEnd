const express = require("express");
const app = express();
const { connect } = require("./src/db");
const adminRouter = require("./src/routes/admin");
const residentRouter = require("./src/routes/resident");

const port = 8080;

connect();
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/resident", residentRouter);

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`);
});

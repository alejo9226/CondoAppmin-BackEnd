const express = require("express");
const app = express();
const { connect } = require("./src/db");
const adminRouter = require("./src/routes/admin");
const residentRouter = require("./src/routes/resident");
const condoRouter = require("./src/routes/condo");
const unitRouter = require("./src/routes/unit");
const cors = require("cors");

const port = 8080;

app.use(cors());
connect();
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/resident", residentRouter);
app.use("/condo", condoRouter);
app.use("/unit", unitRouter);

app.listen(port, () => {
  console.log(`Successfully running at http://localhost:${port}`);
});

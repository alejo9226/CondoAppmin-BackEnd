const mongoose = require("mongoose");

function connect() {
  mongoose.connect("mongodb://localhost:27017/condoappmin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("Connection established successfully");
  });
  mongoose.connection.once("error", (err) => {
    console.log("Something went wrong", err);
  });
}

module.exports = { connect };

const mongoose = require("mongoose");

function connect() {
  mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("Connection established successfully")
  });
  mongoose.connection.once("error", (err) => {
    console.log("Something went wrong", err);
  });
}

module.exports = { connect };

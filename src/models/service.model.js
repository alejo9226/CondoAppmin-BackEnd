const { model, models, Schema } = require("mongoose");

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  condo: { 
    type: Schema.Types.ObjectId, 
    ref: 'Condo', 
    required: true 
  }
}, {
  timestamps: true,
})

const Service = model("Service", serviceSchema);

module.exports = Service;

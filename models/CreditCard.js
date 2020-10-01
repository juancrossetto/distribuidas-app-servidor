const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const CreditCardSchema = mongoose.Schema({
  number: {
    type: Number,
    trim: true,
    require: true,
  },
  entity: {
    type: String,
    trim: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
    require: true,
  },
  expiry: {
    type: String,
    trim: true,
    require: true,
  },
  closeDateSummary: {
    type: Date,
    require: true,
  },
  dueDateSummary: {
    type: Date,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  id: {
    type: Number,
    // type: mongoose.Schema.Types.ObjectId,
    // index: true,
    // required: true,
    // auto: true,
  },
});

module.exports = mongoose.model("CreditCard", CreditCardSchema);

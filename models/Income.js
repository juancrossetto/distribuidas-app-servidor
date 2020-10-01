const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const IncomeSchema = mongoose.Schema({
  amount: {
    type: Number,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  paymentMethod: {
    type: String,
    trim: true,
  },
  bankAccount: {
    type: String,
    require: true,
  },
  bankAccountDescription: {
    type: String,
    require: false,
  },
  text: {
    type: String,
    trim: true,
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
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
    // index: true,
    // required: true,
    // auto: true,
  },
});

module.exports = mongoose.model("Income", IncomeSchema);

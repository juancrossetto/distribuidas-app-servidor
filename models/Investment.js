const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const InvestmentSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    trim: true,
    require: false,
  },
  type: {
    type: String,
    require: true,
  },
  specie: {
    type: String,
    require: false,
    trim: true,
  },
  specieQuantity: {
    type: Number,
    require: false,
  },
  days: {
    type: Number,
    require: true,
  },
  deposited: {
    type: String,
    require: false,
    default: false,
  },
  interestRate: {
    type: Number,
    require: true,
  },
  bankAccount: {
    type: String,
    require: false,
  },
  bankAccountDescription: {
    type: String,
    require: false,
  },
  automaticRenovation: {
    type: String,
    require: false,
  },
  date: {
    type: Date,
    require: true,
  },
  dueDate: {
    type: Date,
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

module.exports = mongoose.model("Investment", InvestmentSchema);

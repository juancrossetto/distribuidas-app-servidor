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
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  days: {
    type: Number,
    require: true,
  },
  interestRate: {
    type: Number,
    require: true,
  },
  bankAccount: {
    type: String,
    require: false,
  },
  autmomaticRenovation: {
    type: Boolean,
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
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
});

module.exports = mongoose.model("Investment", InvestmentSchema);

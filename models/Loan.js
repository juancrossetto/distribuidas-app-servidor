const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const LoanSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    trim: true,
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  fees: {
    type: Number,
    require: true,
  },
  bankAccount: {
    type: String,
    require: true,
  },
  bankAccountDescription: {
    type: String,
    require: false,
  },
  date: {
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

module.exports = mongoose.model("Loan", LoanSchema);

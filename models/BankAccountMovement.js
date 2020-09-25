const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const BankAccountMovementSchema = mongoose.Schema({
  bankAccount: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  bankAccountBalance: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
});

module.exports = mongoose.model(
  "BankAccountMovement",
  BankAccountMovementSchema
);

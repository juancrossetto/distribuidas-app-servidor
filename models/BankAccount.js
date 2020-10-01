const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const ExpenseSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  cbu: {
    type: String,
    require: true,
  },
  entity: {
    type: String,
    require: true,
  },
  debitCard: {
    type: String,
    require: true,
  },
  alias: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
  date: {
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

module.exports = mongoose.model("BankAccount", ExpenseSchema);

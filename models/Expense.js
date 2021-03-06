const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const ExpenseSchema = mongoose.Schema({
  amount: {
    type: Number,
    trim: true,
  },
  paymentType: {
    type: String,
    require: true,
    trim: true,
  },
  paymentId: {
    type: String,
    require: false,
    trim: true,
  },
  bankAccountDescription: {
    type: String,
    require: false,
  },
  expenseType: {
    type: String,
    require: true,
    trim: true,
  },
  detail: {
    type: String,
    require: false,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    require: false,
  },
  fees: {
    type: String,
    trim: true,
    require: false,
  },
  date: {
    type: Date,
    trim: true,
    require: false,
  },
  area: {
    type: String,
    trim: true,
    require: false,
  },
  voucher: {
    type: String,
    trim: true,
    require: false,
  },
  email: {
    type: String,
    trim: true,
    require: false,
  },
  id: {
    type: Number,
    // type: mongoose.Schema.Types.ObjectId,
    // index: true,
    // required: true,
    // auto: true,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);

const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const ExpenseSchema = mongoose.Schema({
  amount: {
    type: String,
    trim: true,
  },
  method_id: {
    type: Number,
    require: true,
  },
  method: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  is_fee: {
    type: Boolean,
    require: true,
  },
  receipt: {
    type: Buffer,
    require: false,
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

module.exports = mongoose.model("Expense", ExpenseSchema);

const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const InvestmentSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    trim: true,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  expiration_date: {
    type: String,
    require: true,
  },
  bank_account: {
    type: String,
    require: false,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
});

module.exports = mongoose.model("Investment", InvestmentSchema);

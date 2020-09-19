const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const BudgetSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
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

module.exports = mongoose.model("Budget", BudgetSchema);

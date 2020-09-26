const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const LoanMovementSchema = mongoose.Schema({
  bankAccount: {
    type: String,
    require: true,
  },
  numberFee: {
    type: Number,
    require: true,
  },
  dueDate: {
    type: Date,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  loan: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  paid: {
    type: Boolean,
    require: false,
    default: false,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
});

module.exports = mongoose.model("LoanMovement", LoanMovementSchema);

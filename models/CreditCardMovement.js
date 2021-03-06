const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const CreditCardMovementSchema = mongoose.Schema({
  creditCardNumber: {
    type: Number,
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
  expense: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  paid: {
    type: String,
    require: false,
    default: false,
  },
  id: {
    type: Number,
    // type: mongoose.Schema.Types.ObjectId,
    // index: true,
    // required: true,
    // auto: true,
  },
});

module.exports = mongoose.model("CreditCardMovement", CreditCardMovementSchema);

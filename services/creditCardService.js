const CreditCard = require("../models/CreditCard");
const CreditCardMovement = require("../models/CreditCardMovement");

exports.getCreditCards = async (email) => {
  try {
    return await CreditCard.find({ email: email }).sort({
      date: -1,
    });
  } catch (error) {
    throw Error("Hubo un error al obtener las tarjetas");
  }
};

exports.payCreditCardMovement = async (movement) => {
  try {
    movement.paid = true;
    await CreditCardMovement.findOneAndUpdate({ _id: movement._id }, movement, {
      new: false,
    });
  } catch (error) {
    throw Error("Hubo un error al pagar la cuota");
  }
};

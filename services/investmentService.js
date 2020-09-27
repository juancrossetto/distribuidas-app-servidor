const Investment = require("../models/Investment");

exports.getTimeDeposits = async () => {
  try {
    return await Investment.find({ type: "Plazo Fijo" });
  } catch (error) {
    throw Error("Hubo un error al obtener los Plazos Fijos");
  }
};

exports.updateInvestment = async (investment) => {
  try {
    await Investment.findOneAndUpdate({ id: investment.id }, investment, {
      new: false,
    });
  } catch (error) {
    throw Error("Hubo un error al actualizar la inversión");
  }
};

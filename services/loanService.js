const Loan = require("../models/Loan");
const LoanMovement = require("../models/LoanMovement");

exports.getAllDueLoansMovements = async () => {
  try {
    return await LoanMovement.find({
      paid: false,
      dueDate: {
        $lte: new Date(),
      },
    });
  } catch (error) {
    throw Error(
      "Hubo un error al obtener las cuotas vencidas de los prestamos tomados"
    );
  }
};

exports.updateLoanMovement = async (movement) => {
  try {
    await LoanMovement.findOneAndUpdate({ _id: movement._id }, movement, {
      new: false,
    });
  } catch (error) {
    throw Error("Error al actualizar los movimientos del prestamo");
  }
};

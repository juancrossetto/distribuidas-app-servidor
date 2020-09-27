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

//TODO Separar entre tomado o dado
exports.getMonthSumLoans = async (email,month) => {
  try {
    return await Loan.aggregate([
        {
            $addFields: {
              month: { $month: "$date" },
            },
          },
          {
            $match: {
              $and: [
                { email: email },
                { month: month },
              ],
            },
          },
        {
            $group: {
                _id: '',
                amount: { $sum: '$amount' }
            }
        },
        {
            $project: {
                _id: 0,
                amount: '$amount'
            }
        }
    ])  
  } catch (error) {
    throw Error("Hubo un error al obtener los prestamos");
  }
};
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

exports.getMonthSumInvestment = async (email, month, year) => {
  try {
    return await Investment.aggregate([
        {
          $addFields: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
        },
        {
          $match: {
            $and: [
              { email: email },
              { month: month },
              { year: year },
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
    throw Error("Hubo un error al obtener las inversiones");
  }
};
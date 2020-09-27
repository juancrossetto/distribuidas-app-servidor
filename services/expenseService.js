const Expense = require("../models/Expense");

exports.getMonthSumExpenses = async (email, month, year) => {
  try {
    return await Expense.aggregate([
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
    throw Error("Hubo un error al obtener los ingresos");
  }
};


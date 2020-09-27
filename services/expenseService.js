const Expense = require("../models/Expense");

exports.getMonthSumExpenses = async (email,month) => {
  try {
    return await Expense.aggregate([
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
    throw Error("Hubo un error al obtener los ingresos");
  }
};


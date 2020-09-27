const Income = require("../models/Income");

exports.getMonthSumIncomes = async (email,month) => {
  try {
    return await Income.aggregate([
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


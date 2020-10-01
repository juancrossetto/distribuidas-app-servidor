const Income = require("../models/Income");

exports.getMonthSumIncomes = async (email, month, year) => {
  try {
    return await Income.aggregate([
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          $and: [{ email: email }, { month: month }, { year: year }],
        },
      },
      {
        $group: {
          _id: "",
          amount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          amount: "$amount",
        },
      },
    ]);
  } catch (error) {
    throw Error("Hubo un error al obtener los ingresos");
  }
};

exports.createIncomeService = async (income) => {
  try {
    await income.save();
  } catch (error) {
    throw Error("Hubo un error al Crear el Ingreso");
  }
};

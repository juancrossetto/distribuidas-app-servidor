const Budget = require("../models/Budget");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { getMonthSumExpenses } = require("../services/expenseService");
const { getMonthSumIncomes } = require("../services/incomeService");
const { getMonthSumInvestment } = require("../services/investmentService");
const { getMonthSumLoans } = require("../services/loanService");


// get prestamos
exports.getBudgets = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      budgets = await Budget.find({ email: email }).sort({
        date: -1,
      });
      res.json({ budgets });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los prestamos" });
  }
};

exports.createBudget = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    // crea el nuevo egreso
    const budget = new Budget(req.body);

    await budget.save();
    res.json({ budget });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Hubo un error al Crear el Presupuesto" });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }

    await Budget.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Presupuesto Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getByType = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { email, month, year } = req.body;
    if (email && month && year) {
      budgets = await Budget.aggregate([
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
              { year: year }
            ],
          },
        },
        {
          $group: {
            _id: "$type",
            TotalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);

      let response = {
        expenses: await getMonthSumExpenses(email, month, year),
        incomes: await getMonthSumIncomes(email, month, year),
        investments: await getMonthSumInvestment(email, month, year),
        loans: await getMonthSumLoans(email, month, year),
        budgets:budgets,
      }

      res.json({ response });
    } else {
      return res.status(400).json({ msg: "Tiene que indicarse mail, mes y año" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los prestamos" });
  }
};

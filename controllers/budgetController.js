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
    const { email } = req.body;
    if (email) {
      let currentDate = new Date();
      budgets = await Budget.aggregate([
        {
          $addFields: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
        },
        {
          $match: {
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
            email: email,
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
        expenses: await getMonthSumExpenses(email, currentDate.getMonth() + 1),
        incomes: await getMonthSumIncomes(email, currentDate.getMonth() + 1),
        investments: await getMonthSumInvestment(email, currentDate.getMonth() + 1),
        loans: await getMonthSumLoans(email, currentDate.getMonth() + 1),
        budgets:budgets,
      }

      res.json({ response });
    } else {
      return res.status(400).json({ msg: "Tiene que indicarse mail y mes" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los prestamos" });
  }
};

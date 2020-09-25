const Budget = require("../models/Budget");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
            month: month,
            year: year,
            email: email,
          },
        },
        {
          $group: {
            _id: "$category",
            TotalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);
      res.json({ budgets });
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

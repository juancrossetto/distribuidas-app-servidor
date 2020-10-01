const Income = require("../models/Income");
const { validationResult } = require("express-validator");
const { createIncomeService } = require("../services/incomeService");

// get ingresos
exports.getIncomes = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      incomes = await Income.find({ email: email }).sort({
        date: -1,
      });
      res.json({ incomes });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los Ingresos" });
  }
};

// alta de ingreso
exports.createIncome = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { email, id } = req.body;
    const income = await Income.findOne({ email, id });
    if (income) {
      // ya existe, actualiza
      await Income.findOneAndUpdate({ _id: income._id }, income, {
        new: false,
      });
    } else {
      // no existe, lo crea
      const income = new Income(req.body);
      await income.save();
    }

    res.json({ income });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear el Ingreso" });
  }
};

// exports.bulkInsertIncome = async (req, res) => {

// }

// baja de ingreso
exports.deleteIncome = async (req, res) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ msg: "No existe el ingreso" });
    }

    await Income.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Ingreso Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// modificacion de ingreso

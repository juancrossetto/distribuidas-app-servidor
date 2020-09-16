const Income = require("../models/Income");
const { validationResult } = require("express-validator");

exports.createIncome = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    // crea el nuevo usuario
    console.log(req.body);
    const income = new Income(req.body);

    await income.save();
    res.json({ income });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear el Ingreso" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    if (email) {
      incomes = await Income.find({ email: email }).sort({
        date: -1,
      });
      console.log(incomes);
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

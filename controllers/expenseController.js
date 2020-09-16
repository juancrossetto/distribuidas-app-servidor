const Expense = require("../models/Expense");
const { validationResult } = require("express-validator");

// get egresos 
exports.getExpenses = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    if (email) {
      expenses = await Expense.find({ email: email }).sort({
        date: -1,
      });
      console.log(expenses);
      res.json({ expenses });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los Egresos" });
  }
};

// alta de Egreso
exports.createIncome = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    // crea el nuevo egreso
    console.log(req.body);
    const expense = new Expense(req.body);

    await expense.save();
    res.json({ expense });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear el Egreso" });
  }
};

// baja de egreso
exports.deleteIncome = async (req, res) => {
  try {
    let expense = await expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: "No existe el Egreso" });
    }

    await Expense.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Egreso Eliminado" });
} catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// modificacion de egreso


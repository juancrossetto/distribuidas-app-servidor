const Loan = require("../models/Loan");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// get prestamos
exports.getLoans = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      loans = await Loan.find({ email: email }).sort({
        date: -1,
      });
      console.log(loans);
      res.json({ loans });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los prestamos" });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    // crea el nuevo egreso
    const loan = new Loan(req.body);

    await loan.save();
    res.json({ loan });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear el Prestamo" });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    let loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }

    await Loan.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Prestamo Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

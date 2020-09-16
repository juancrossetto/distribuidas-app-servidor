const Investment = require("../models/Investment");
const { validationResult } = require("express-validator");

// get inversiones 
exports.getInvestments = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    if (email) {
      investments = await Investment.find({ email: email }).sort({
        expiration_date: -1,
      });
      console.log(investments);
      res.json({ investments });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener las Inversiones" });
  }
};

// alta de inversion
exports.createInvestments = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    // crea el nuevo egreso
    console.log(req.body);
    const investment = new Investment(req.body);

    await investment.save();
    res.json({ investment });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear la inversion" });
  }
};

// baja de inversion
exports.deleteInvestment = async (req, res) => {
  try {
    let investment = await Investment.findById(req.params.id);

    if (!investment) {
      return res.status(404).json({ msg: "No existe la inversion" });
    }

    await Investment.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Inversion Eliminada" });
} catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// modificacion de inversion


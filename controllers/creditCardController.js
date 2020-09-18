const CreditCard = require("../models/CreditCard");
const { validationResult } = require("express-validator");

// get credit cards
exports.getCreditCards = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      creditCards = await CreditCard.find({ email: email }).sort({
        date: -1,
      });
      res.json({ creditCards });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener las Tarjetas de Crédito" });
  }
};

// create credit card
exports.createCreditCard = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    // crea la nueva Tarjeta de Credito
    console.log(req.body);
    const creditCard = new CreditCard(req.body);

    await creditCard.save();
    res.json({ creditCard });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Hubo un error al Crear la Tarjeta de Crédito" });
  }
};

// baja de tarjeta de crédito
exports.deleteCreditCard = async (req, res) => {
  try {
    let creditCard = await CreditCard.findById(req.params.id);

    if (!creditCard) {
      return res.status(404).json({ msg: "No existe la tarjeta de crédito" });
    }

    await CreditCard.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarjeta de Crédito Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

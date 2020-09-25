const CreditCard = require("../models/CreditCard");
const CreditCardMovement = require("../models/CreditCardMovement");
const { validationResult } = require("express-validator");
const {
  getCreditCards,
  payCreditCardMovement,
} = require("../services/creditCardService");
// get credit cards
exports.getCreditCards = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      const creditCards = await getCreditCards(email);
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

// modificacion
exports.updateCreditCard = async (req, res) => {
  try {
    const { email, closeDateSummary, dueDateSummary, number } = req.body;
    const creditCard = await CreditCard.findOne({ email, number });
    if (!creditCard) {
      return res
        .status(400)
        .json({ msg: "La tarjeta no se encuentra registrada" });
    } else {
      creditCard.closeDateSummary = closeDateSummary;
      creditCard.dueDateSummary = dueDateSummary;

      await CreditCard.findOneAndUpdate({ _id: creditCard._id }, creditCard, {
        new: false,
      });
      res.json({ creditCard });
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.payOverdueFees = async (req, res) => {
  try {
    const { email } = req.body;

    if (email) {
      const movementsDues = await CreditCardMovement.find({
        email,
        paid: false,
        dueDate: {
          $lt: new Date(),
        },
      });
      if (movementsDues) {
        movementsDues.forEach((movement) => {
          payCreditCardMove(movement);
          // updateBankAccountBalance();
        });
      }
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }

    // if (!creditCard) {
    //   return res
    //     .status(400)
    //     .json({ msg: "La tarjeta no se encuentra registrada" });
    // } else {
    //   creditCard.closeDateSummary = closeDateSummary;
    //   creditCard.dueDateSummary = dueDateSummary;

    //   await CreditCard.findOneAndUpdate({ _id: creditCard._id }, creditCard, {
    //     new: false,
    //   });
    res.json({ msg: "Cuotas pagadas OK" });
    // }
  } catch (error) {
    res.status(500).json({ msg: `Hubo un error ${error}` });
  }
};

const payCreditCardMove = async (move) => {
  await payCreditCardMovement(move);
};

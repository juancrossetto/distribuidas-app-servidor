const BankAccount = require("../models/BankAccount");
const { validationResult } = require("express-validator");
const { baseModelName } = require("../models/BankAccount");

// get cuentas 
exports.getBankAccounts = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    if (email) {
        bankAccounts = await BankAccount.find({ email: email }).sort({
        date: -1,
      });
      console.log(bankAccounts);
      res.json({ bankAccounts });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener las cuentas" });
  }
};

// alta de cuenta de banco
exports.createBankAccount = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    // crea el nuevo egreso
    console.log(req.body);
    const bankAccount = new BankAccount(req.body);

    await bankAccount.save();
    res.json({ bankAccount });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear la cuenta" });
  }
};

// baja de egreso
exports.deleteBankAccount = async (req, res) => {
  try {
    let bankAccount = await BankAccount.findById(req.params.id);

    if (!bankAccount) {
      return res.status(404).json({ msg: "No existe la cuenta" });
    }

    await BankAccount.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Cuenta Eliminada" });
} catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.changeBalance  = async (req, res) => {
  try {
    const { id, amount } = req.body;
    let bankAccount = await BankAccount.findById(id);
    if (!bankAccount) {
      return res.status(404).json({ msg: "No existe la cuenta" });
    };

    let newBalance = bankAccount.balance + amount;

    // El gasto no puede ser mayor al dinero que tiene la cuenta
    if (newBalance <0){
      return res.status(400).json({ msg: "Monto insuficiente" });
    };

    bankAccount.balance = newBalance

    await BankAccount.findOneAndUpdate({ id: bankAccount.id }, bankAccount, {
      new: false,
    });

    res.json({ bankAccount });
} catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// modificacion de egreso


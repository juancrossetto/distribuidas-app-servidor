const BankAccount = require("../models/BankAccount");
const BankAccountMovement = require("../models/BankAccountMovement");

exports.changeBalance = async (id, amount, type) => {
  try {
    const bankAccount = await BankAccount.findOne({ id: id });
    if (!bankAccount) {
      return "No existe la cuenta";
    }

    let newBalance = bankAccount.balance + amount;
    // El gasto no puede ser mayor al dinero que tiene la cuenta
    if (newBalance < 0) {
      return "Monto insuficiente";
    }

    bankAccount.balance = newBalance;
    await BankAccount.findOneAndUpdate({ id: bankAccount.id }, bankAccount, {
      new: false,
    });

    const movement = new BankAccountMovement();
    movement.bankAccount = id;
    movement.date = new Date();
    movement.amount = amount;
    movement.type = type;
    movement.bankAccountBalance = bankAccount.balance;
    movement.email = bankAccount.email;
    await movement.save();
    return "Saldo Actualizado Correctamente";
  } catch (error) {
    return `Hubo un error al Actualizar el saldo de las cuentas: ${error}`;
  }
};

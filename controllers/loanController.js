const Loan = require("../models/Loan");
const LoanMovement = require("../models/LoanMovement");
const { validationResult } = require("express-validator");
const { addMonthCurrentDateWithoutFormat } = require("../utils");
const moment = require("moment");

// get prestamos
exports.getLoans = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      loans = await Loan.find({ email: email }).sort({
        date: -1,
      });
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
    const { email, id } = req.body;
    const loan = await Loan.findOne({ email, id });
    if (loan) {
      // ya existe, actualiza
      await Loan.findOneAndUpdate({ _id: loan._id }, loan, {
        new: false,
      });
    } else {
      // no existe, lo crea
      const loan = new Loan(req.body);

      //SE PASO LOGICA AL FRONT
      // if (loan.paymentMethod === "BAN" && loan.type === "TOM") {
      //   // Crear un movimiento por cada cuota
      //   const feeAmount = loan.amount / loan.fees;
      //   for (let fee = 1; fee <= loan.fees; fee++) {
      //     const movement = new LoanMovement();
      //     var dateString = await addMonthCurrentDateWithoutFormat(fee);
      //     const dueDate = new Date(dateString);
      //     movement.numberFee = fee;
      //     movement.bankAccount = loan.bankAccount;
      //     movement.amount = feeAmount;
      //     movement.dueDate = dueDate;
      //     movement.loan = loan.id;
      //     movement.email = loan.email;
      //     await movement.save();
      //   }
      // }
      await loan.save();
    }

    res.json({ loan });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: `Hubo un error al Crear el Prestamo: ${error}` });
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

// alta de movimiento de prestamo (cuota)
exports.createLoanMovement = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { email, id } = req.body;
    const loanMovement = await LoanMovement.findOne({
      email,
      id,
    });
    if (loanMovement) {
      // ya existe, actualiza
      await LoanMovement.findOneAndUpdate(
        { _id: loanMovement._id },
        loanMovement,
        {
          new: false,
        }
      );
    } else {
      // no existe, lo crea
      const loanMovement = new LoanMovement(req.body);
      await loanMovement.save();
    }

    res.json({ loanMovement });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Hubo un error al Crear un Movimiento del Préstamo",
    });
  }
};

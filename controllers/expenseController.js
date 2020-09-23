const Expense = require("../models/Expense");
const creditCardMovement = require("../models/creditCardMovement");
const { validationResult } = require("express-validator");
const { addMonthCurrentDate } = require("../utils");

// get egresos
exports.getExpenses = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      expenses = await Expense.find({ email: email }).sort({
        date: -1,
      });
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
exports.createExpense = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const expense = new Expense(req.body);

    if (expense.paymentType === "TRC") {
      // Crear un movimiento por cada cuota
      const feeAmount = expense.amount / expense.fees;
      for (let fee = 1; fee <= expense.fees; fee++) {
        const movement = new creditCardMovement();
        movement.numberFee = fee;
        movement.creditCardNumber = expense.paymentId;
        movement.amount = feeAmount;
        movement.dueDate = await addMonthCurrentDate(fee);
        movement.expense = expense.id;
        movement.email = expense.email;

        await movement.save();
      }
    }

    await expense.save();
    res.json({ expense });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear el Egreso" });
  }
};

// baja de egreso
exports.deleteExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

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

exports.getExpensesByPayment = async (req, res) => {
  try {
    const { paymentType, id } = req.body;
    let currentDate = new Date();

    if (paymentType) {
      expenses = await Expense.aggregate([
        {
          $addFields: {
            month: { $month: "$date" },
          },
        },
        {
          $match: {
            $and: [
              { paymentType: paymentType },
              { paymentId: id },
              { month: currentDate.getMonth() + 1 },
            ],
          },
        },
        {
          $group: {
            _id: null,
            TotalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);
      let totalAmount = null;
      if (expenses.length > 0) {
        totalAmount = expenses[0].TotalAmount;
      }
      res.json({ totalAmount });
    } else {
      return res
        .status(400)
        .json({ msg: "Tiene que indicarse un tipo y un id de tipo" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los Egresos" });
  }
};

exports.getMontlyExpenses = async (req, res) => {
  try {
    const { email } = req.body;
    let currentDate = new Date();

    if (email) {
      expenses = await Expense.aggregate([
        {
          $addFields: {
            month: { $month: "$date" },
          },
        },
        {
          $match: {
            $and: [{ email: email }, { month: currentDate.getMonth() + 1 }],
          },
        },
        {
          $group: {
            _id: "$paymentType",
            TotalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);
      res.json({ expenses });
    } else {
      return res.status(400).json({ msg: "Tiene que indicarse un email" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los Egresos" });
  }
};

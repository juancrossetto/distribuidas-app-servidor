const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { check } = require("express-validator");

// api/expenses
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("paymentType", "El medio de pago es obligatoria").not().isEmpty(),
    check("expenseType", "El Tipo de egreso es obligatorio").not().isEmpty(),
  ],
  expenseController.createExpense
);

// api/expenses
router.get("/:email", expenseController.getExpenses);

router.post(
  "/getbypayment",
  [
    check("paymentType", "El tipo de pago es obligatorio").not().isEmpty(),
  ],
  expenseController.getExpensesByPayment
);

router.post("/monthlyexpenses", expenseController.getMontlyExpenses);


module.exports = router;

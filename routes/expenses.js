const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const { check } = require("express-validator");

// api/expenses
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("category", "La Categoría es obligatoria").not().isEmpty(),
    check("method_id", "El metodo es obligatorio").not().isEmpty(),
  ],
  expenseController.createExpense
);

// api/expenses
router.get("/:email", expenseController.getExpenses);

module.exports = router;

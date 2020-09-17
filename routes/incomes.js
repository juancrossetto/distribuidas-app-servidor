const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const { check } = require("express-validator");

// api/incomes
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("category", "La Categoría es obligatoria").not().isEmpty(),
    check("paymentMethod", "El método de Cobro es obligatorio").not().isEmpty(),
  ],
  incomeController.createIncome
);

// api/incomes
router.get("/:email", incomeController.getIncomes);

module.exports = router;

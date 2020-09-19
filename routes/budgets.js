const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const { check } = require("express-validator");

// api/budgets
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("amount", "El Monto debe ser integer.").isNumeric(),
    check("email", "El mail es obligatorio").not().isEmpty(),
    check("category", "La categoría es obligatoria").not().isEmpty(),
  ],
  budgetController.createBudget
);

// api/budgetsbudgets
router.get("/:email", budgetController.getBudgets);

router.post("/getbytype",
[
  check("email", "El mail es obligatorio").not().isEmpty(),
  check("month", "El mes debe ser integer.").isNumeric().not(),
  check("year", "El año debe ser integer.").isNumeric(),

],
budgetController.getByType);

router.delete("/:id", budgetController.deleteBudget)

module.exports = router;

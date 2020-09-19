const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investmentController");
const { check } = require("express-validator");

// api/loans
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("days", "El plazo en días es obligatorio").not().isEmpty(),
    check("interestRate", "La Tasa de Interés es obligatoria").not().isEmpty(),
    check("dueDate", "La Feche de Vencimiento es obligatoria").not().isEmpty(),
    check("bankAccount", "La cuenta bancaria es obligatoria").not().isEmpty(),
  ],
  investmentController.createInvestments
);

// api/loans
router.get("/:email", investmentController.getInvestments);

module.exports = router;

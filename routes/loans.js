const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const { check } = require("express-validator");

// api/loans
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("category", "La Categoría es obligatoria").not().isEmpty(),
    check("bankAccount", "La cuenta bancaria es obligatoria").not().isEmpty(),
  ],
  loanController.createLoan
);

// api/loans
router.get("/:email", loanController.getLoans);

module.exports = router;

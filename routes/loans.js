const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");
const { check } = require("express-validator");

// api/loans
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("amount", "El Monto es obligatorio.").isNumeric(),
    check("email", "El mail es obligatorio").not().isEmpty(),
    check("type", "El tipo es obligatorio").not().isEmpty(),
  ],
  loanController.createLoan
);

// api/loans
router.get("/:email", loanController.getLoans);
router.post("/movement/", loanController.createLoanMovement);

module.exports = router;

const express = require("express");
const router = express.Router();
const bankAccountController = require("../controllers/bankAccountController");
const { check } = require("express-validator");

// api/bankaccounts
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("category", "La Categoría es obligatoria").not().isEmpty(),
    check("method_id", "El metodo es obligatorio").not().isEmpty(),
  ],
  bankAccountController.createBankAccount
);

// api/bankaccounts
router.get("/:email", bankAccountController.getBankAccounts);

module.exports = router;

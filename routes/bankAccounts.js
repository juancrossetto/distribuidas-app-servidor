const express = require("express");
const router = express.Router();
const bankAccountController = require("../controllers/bankAccountController");
const { check } = require("express-validator");

// api/bankaccounts
router.post(
  "/",
  [
    check("email", "El Email es obligatorio.").not().isEmpty(),
    check("cbu", "El CBU es obligatorio").not().isEmpty(),
    check("balance", "El metodo es obligatorio").isNumeric()
  ],
  bankAccountController.createBankAccount
);

// api/bankaccounts
router.get("/:email", bankAccountController.getBankAccounts);

router.put("/changeBalance", bankAccountController.changeBalance );



module.exports = router;

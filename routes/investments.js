const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investmentController");
const { check } = require("express-validator");

// api/loans
router.post(
  "/",
  [
    check("amount", "El Monto es obligatorio.").not().isEmpty(),
    check("category", "La Categoría es obligatoria").not().isEmpty(),
    check("bankAccount", "La cuenta bancaria es obligatoria").not().isEmpty(),
  ],
  investmentController.createInvestments
);

// api/loans
router.get("/:email", investmentController.getInvestments);

module.exports = router;

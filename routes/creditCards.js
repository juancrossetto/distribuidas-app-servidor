const express = require("express");
const router = express.Router();
const creditCardController = require("../controllers/creditCardController");
const { check } = require("express-validator");

// api/creditCards
router.post(
  "/",
  [
    check("number", "El Número de tarjeta es obligatorio.").not().isEmpty(),
    check("entity", "La entidad Bancaria es obligatorio.").not().isEmpty(),
    check("name", "El Nombre es obligatorio.").not().isEmpty(),
    check("expiry", "La Fecha de Expiración es obligatoria").not().isEmpty(),
    check("closeDateSummary", "La Fecha de Cierre del Résumen es obligatoria")
      .not()
      .isEmpty(),
    check(
      "dueDateSummary",
      "La Fecha de Vencimiento del Résumen es obligatoria"
    )
      .not()
      .isEmpty(),
  ],
  creditCardController.createCreditCard
);

// api/creditCards
router.get("/:email", creditCardController.getCreditCards);

// api/creditCards
router.put("/", [], creditCardController.updateCreditCard);

router.post(
  "/payOverdueFees",
  [check("email", "El Mail es obligatorio.").not().isEmpty()],
  creditCardController.payOverdueFees
);

router.get("/getMovements/:email", creditCardController.getAllMovements);
router.post("/movement/", creditCardController.createCreditCardMovement);

module.exports = router;

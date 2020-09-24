const express = require("express");
const router = express.Router();
const pushNotificationController = require("../controllers/pushNotificationController");
const { check } = require("express-validator");

// api/pushNotifications
router.post(
  "/",
  [
    check("token", "El Token es obligatorio.").not().isEmpty(),
    check("email", "El Email es obligatorio.").not().isEmpty(),
  ],
  pushNotificationController.saveToken
);

// api/pushNotifications/getAllTokens
router.get("/getAllTokens", pushNotificationController.getAllTokens);

module.exports = router;

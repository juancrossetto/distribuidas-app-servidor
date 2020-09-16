// Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Iniciar sesión
// api/auth
router.post("/", authController.authenticateUser);

// Obtiene el usuario autenticado
router.get("/", auth, authController.userAuthenticated);

router.put("/changePassword/", authController.changePassword);

module.exports = router;

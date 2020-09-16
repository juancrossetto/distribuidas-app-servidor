const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
// Create an user
// api/user
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

// router.get("/:userType", auth, userController.getUsers);

// Get User By Email
// api/users/:email
router.get("/:email", userController.getUserByEmail);

router.put("/:id", auth, userController.updateUser);

router.delete("/:id", auth, userController.deleteUser);

module.exports = router;

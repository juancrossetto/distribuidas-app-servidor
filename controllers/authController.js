const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  // extraer el email y password
  const { email, password } = req.body;

  try {
    // Revisar que sea un usuario registrado
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    // Revisar el password
    const correctPass = await bcryptjs.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    }
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

// Obtiene que usuario esta autenticado.
exports.userAuthenticated = async (req, res) => {
  try {
    //obtenemos todo el usuario menos el password, por seguridad
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password, newPassword, resetPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "El email indicado no se encuentra registrado" });
    } else {
      let correctPass = true;
      if (!resetPassword) {
        correctPass = await bcryptjs.compare(password, user.password);
      }

      if (!correctPass) {
        return res
          .status(400)
          .json({ msg: "La contraseña actual indicada no es válida" });
      } else {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newPassword, salt);
        await User.findOneAndUpdate({ _id: user._id }, user, {
          new: false,
        });
        res.json({ user });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

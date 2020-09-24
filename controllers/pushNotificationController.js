const PushNotification = require("../models/PushNotification");
const { validationResult } = require("express-validator");

exports.getAllTokens = async (req, res) => {
  try {
    tokens = await PushNotification.find();
    res.json({ tokens });
  } catch (error) {
    return res.status(400).json({ msg: "Hubo un error al obtener Tokens" });
  }
};

exports.saveToken = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    const { email, token } = req.body;
    let tokenExist = await PushNotification.findOne({ token });

    if (tokenExist) {
      console.log(tokenExist);
      return res.status(400).json({ msg: "El Token ya existe" });
    } else {
      const pushNotification = new PushNotification(req.body);

      await pushNotification.save();
    }

    res.json({ pushNotification });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Hubo un error al Crear el Token" });
  }
};

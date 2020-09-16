const Income = require("../models/Income");

exports.getIncomes = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      incomes = await Income.find({ email: email }).sort({
        date: -1,
      });
      res.json({ incomes });
    } else {
      return res.status(400).json({ msg: "No se ha indicado un email" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Hubo un error al Obtener los Ingresos" });
  }
};

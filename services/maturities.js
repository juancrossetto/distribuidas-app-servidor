const moment = require("moment");

const { getWeeklyInvestments } = require("../services/investmentService")

exports.getWeeklyMaturities = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    
    let today = moment();
    let from_date = today.startOf('week').format('yyyy-MM-DD');
    let to_date = today.endOf('week').format('yyyy-MM-DD');
    let maturities = {
      investments: await getWeeklyInvestments(email, from_date, to_date),
    };
    return await res.json(maturities);
  } catch (error) {
    throw Error("Hubo un error al obtener los vencimientos de la semana");
  }
};



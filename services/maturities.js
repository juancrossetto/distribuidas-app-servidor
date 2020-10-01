const moment = require("moment");

const { getWeeklyInvestments } = require("../services/investmentService");
const { getWeeklyCards } = require("../services/creditCardService");
const { getWeeklyLoans } = require("../services/loanService");

exports.getWeeklyMaturities = async (req, res) => {
  try {
    const { email } = req.params;

    let today = moment();
    let from_date = today.startOf("week").format("yyyy-MM-DD");
    let to_date = today.endOf("week").format("yyyy-MM-DD");

    console.log(
      "Vencimientos semanales desde el ",
      from_date,
      "hasta el ",
      to_date
    );

    let maturities = {
      investments: await getWeeklyInvestments(email, from_date, to_date),
      creditCards: await getWeeklyCards(email, from_date, to_date),
      loans: await getWeeklyLoans(email, from_date, to_date),
    };
    return await res.json(maturities);
  } catch (error) {
    throw Error("Hubo un error al obtener los vencimientos de la semana");
  }
};

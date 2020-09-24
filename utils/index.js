const moment = require("moment");

exports.addMonthCurrentDate = async (months) => {
  return moment().add(months, "M").format("DD-MM-YYYY");
  //    return  moment().add(months, 'M').subtract(1, 'day').format('DD-MM-YYYY')
};

exports.getCurrentDate = () => {
  return moment().format("DD-MM-YYYY");
};

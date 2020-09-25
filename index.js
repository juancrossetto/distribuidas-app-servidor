const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors"); //npm i cors
const cron = require("node-cron");
const {
  getAllTokens,
  sendPushNotification,
} = require("./services/pushNotificationService");
const { getCreditCards } = require("./services/creditCardService");
// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const port = process.env.PORT || 4000;

// Importar rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/incomes", require("./routes/incomes"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/loans", require("./routes/loans"));
app.use("/api/budgets", require("./routes/budgets"));
app.use("/api/investments", require("./routes/investments"));
app.use("/api/bankaccounts", require("./routes/bankAccounts"));
app.use("/api/creditCards", require("./routes/creditCards"));

app.use("/api/pushNotifications", require("./routes/pushNotification"));

// arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

//* * * * * una vez por minuto
//0 */6 * * *  una vez cada 6 hs
cron.schedule("0 */4 * * *", () => {
  //Envia Push notifications si detecta tarjetas de credito vencidas
  getPNTokens();
});

const getPNTokens = async () => {
  const tokens = await getAllTokens();

  //recorremos por cada token/email
  tokens.forEach((token) => {
    sendPushNotifications(token);
  });
};

const sendPushNotifications = async (token) => {
  const today = new Date();
  const creditCards = await getCreditCards(token.email);
  creditCards.forEach((creditCard) => {
    if (creditCard.dueDateSummary < today) {
      sendPushNotification(
        token.token,
        "OrganizApp -Información Vencidaa!! 📬",
        `${token.name} por favor Renueve la fecha de vencimiento y cierre de tu tarjeta de crédito 💳`
      );
    }
  });
  console.log(`Notificacion enviada`);
};

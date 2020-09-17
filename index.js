const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors"); //npm i cors

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
app.use("/api/investments", require("./routes/investments"));
app.use("/api/bankaccounts", require("./routes/bankaccounts"));


// arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

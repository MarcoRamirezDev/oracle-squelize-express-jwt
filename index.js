const express = require("express");
const sequelize = require("./src/db/dbConnection");
const logger = require("./src/config/logger");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./src/models/UserModel");
require("./src/models/SessionModel");
//Initialization app express
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Sincronizar el modelos con la base de datos y luego iniciar el servidor
sequelize
  .sync()
  .then(() => {
    logger.info("Conexión establecida con la base de datos.");
    app.use("/qualitas-clm/api/login", require("./src/routes/auth/route"));
    app.use("/qualitas-clm/api/user", require("./src/routes/usuarios/route"));
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      logger.info(`Servidor arrancado en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("No se pudo conectar a la base de datos:", err);
  });

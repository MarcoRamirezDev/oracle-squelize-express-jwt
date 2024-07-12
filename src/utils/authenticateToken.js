const jwt = require("jsonwebtoken");
const { security } = require("../config/keys");
const logger = require("../config/logger");
const response = require("../utils/response");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    logger.error("Token no encontrado");
    return response.error(res, { message: "Acceso no autorizado" }, 401);
  }

  jwt.verify(token, security.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      logger.error("Token inválido");
      return response.error(res, { message: "Token inválido" }, 403);
    }
    logger.info(`Token encontrado decodificado: ${JSON.stringify(decodedToken)}`);
    req.user = decodedToken;
    next();
  });
}

module.exports = authenticateToken;

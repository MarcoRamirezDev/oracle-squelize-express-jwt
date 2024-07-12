const logger = require("../config/logger");
const UserModel = require("../models/UserModel");
const jwtUtils = require("../utils/jwtUtils");
const response = require("../utils/response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const SessionModel = require("../models/SessionModel");

exports.login = async (req, res) => {
  logger.info(`Intento de inicio de sesión`);
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      logger.error(`Correo o password requeridos`);
      throw new Error("Correo y password son requeridos");
    }

    const user = await UserModel.findOne({ where: { correo } });

    if (!user) {
      logger.error(`Usuario no encontrado con correo: ${correo}`);
      throw new Error("Usuario no encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      logger.error(`password incorrecta para el usuario: ${correo}`);
      throw new Error("password incorrecta");
    }

    const token = jwtUtils.generateToken(user);
    logger.info(`Usuario logueado: ${correo}`);

    const sessionId = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // La sesión expira en 24 horas
    logger.info(`Fecha expiración: ${expiresAt}`);
    await SessionModel.create({
      sessionId,
      userId: user.id,
      correo: user.correo,
      expiresAt,
    });
    logger.info(`Se guardo correctamente la sesión: ${sessionId}`);
    response.success(res, { correo, token });
  } catch (err) {
    logger.error(`Error al intentar iniciar sesión: ${err}`);
    response.error(res, err);
  }
};

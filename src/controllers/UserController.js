const logger = require("../config/logger");
const UserModel = require("../models/UserModel");
const response = require("../utils/response");
const { Op } = require("sequelize");
const authenticateToken = require("../utils/authenticateToken");
exports.createUser = async (req, res) => {
  logger.info(`Creación de usuario`);
  try {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      logger.error(`La petición no debe ser vacia: ${JSON.stringify(body)}`);
      throw new Error("El body is required");
    }
    logger.info(`Datos de la petición: ${JSON.stringify(body)}`);
    const result = await UserModel.create(req.body);
    logger.info(`Usuario creado: ${JSON.stringify(result)}`);
    response.success(res, result);
  } catch (err) {
    logger.error(`Error al realizar guardado: ${err}`);
    response.error(res, err);
  }
};

exports.getAllUsers = async (req, res) => {
  logger.info(`Consulta de Usuarios`);
  try {
    
    authenticateToken(req, res, async () => {
      const body = req.body;
      if (!body || Object.keys(body).length === 0) {
        logger.error(`La petición no debe ser vacía: ${JSON.stringify(body)}`);
        throw new Error("El body is required");
      }
      const { limit, page, sort, filters } = body;
      const limitValue = limit ? parseInt(limit, 10) : 10;
      const pageValue = page ? parseInt(page, 10) : 1;
      const offsetValue = (pageValue - 1) * limitValue;

      if (isNaN(limitValue) || isNaN(pageValue)) {
        logger.error(`Los parámetros limit y page no son numéricos`);
        throw new Error(`Los parámetros limit y page deben ser numéricos`);
      }

      let options = {
        limit: limitValue,
        offset: offsetValue,
        order: [["firstName", "DESC"]],
      };

      // Agregar ordenamiento
      if (sort) {
        const [sortField, sortOrder] = sort.split(":");
        options.order = [[sortField, sortOrder.toUpperCase()]];
      }

      // Agregar filtrado
      if (filters && filters.length > 0) {
        const whereClause = {
          [Op.and]: filters.map((filter) => ({
            [filter.field]: {
              [Op.like]: `%${filter.value}%`,
            },
          })),
        };
        options.where = whereClause;
      }
      logger.info(`Parámetros body de la consulta: ${JSON.stringify(body)}`);
      const users = await UserModel.findAll({
        attributes: { exclude: ["password"] },
        ...options,
      });
      //logger.info(`Result: ${JSON.stringify(users)}`); 
      response.success(res, users);
    });
  } catch (err) {
    logger.error(`Error al consultar todos los usuarios: ${err}`);
    response.error(res, err);
  }
};

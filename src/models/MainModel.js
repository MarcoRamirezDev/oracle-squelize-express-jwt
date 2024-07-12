const Sequelize = require('@sequelize/core');
const sequelize = require('../db/dbConnection');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Usuarios = require('./UserModel')(sequelize, Sequelize);
db.Sessions = require('./SessionModel')(sequelize, Sequelize);


db.Usuarios.hasMany(db.Sessions, { foreignKey: 'userId' });
db.Sessions.belongsTo(db.Usuarios, { foreignKey: 'userId' });

module.exports = db;

require("oracledb");
const Sequelize = require("sequelize");
const {database} = require("../config/keys");
const sequelize = new Sequelize({
  username: database.user,
  password: database.password,
  dialect: database.dialect ? database.dialect : 'oracle',
  dialectOptions: {
    connectString: database.connectString
  },
  define: {
    timestamps: true,
    underscored: false,
  },
  
});

module.exports = sequelize;

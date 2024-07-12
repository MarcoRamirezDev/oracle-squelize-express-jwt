const { DataTypes } = require("sequelize");
const sequelize = require("./../db/dbConnection");

const Session = sequelize.define(
  "Session",
  {
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
    },
   correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
);

module.exports = Session;


const { DataTypes } = require("sequelize");
const sequelize = require("./../db/dbConnection");
const bcrypt = require("bcrypt");

const Usuarios = sequelize.define(
  "Usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      /*validate: {
        isEmail: true,
      },*/
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      /*      validate: {
        len: [6, 20],
      },*/
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const hash = await bcrypt.hash(usuario.password, 10);
          usuario.password = hash;
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed("password")) {
          const hash = await bcrypt.hash(usuario.password, 10);
          usuario.password = hash;
        }
      },
    },
  }
);

module.exports = Usuarios;

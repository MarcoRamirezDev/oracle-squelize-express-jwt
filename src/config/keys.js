const host = "host";
const port = 1521;
const nameDb = "nameDB";
const user = "usuarioDB";
const pass = "passDB";
module.exports = {
  security: {
    SECRET_KEY: "qualitas-clm-jwt-secret",
    tokenExpiration: "1h",
  },

  database: {
    connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${host})(PORT=${port}))(CONNECT_DATA=(SID=${nameDb})))`,
    port: port,
    user: user,
    password: pass,
    dialect: "oracle",
  },
};

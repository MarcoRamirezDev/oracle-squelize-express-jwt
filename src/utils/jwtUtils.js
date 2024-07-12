const jwt = require("jsonwebtoken");
const { security } = require("../config/keys");

function generateToken(user) {
  const payload = {
    id: user.id,
    correo: user.correo,
  };
  return jwt.sign(payload, security.SECRET_KEY, {
    expiresIn: security.tokenExpiration,
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, security.SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};

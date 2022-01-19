const jsonwebtoken = require('jsonwebtoken');

const config = {
  secrets: {
    session: 'myPassw0r!!!!!',
  },
  expiresIn: '1h',
};

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, config.secrets.session, {
    expiresIn: config.expiresIn,
  });
}

function isAuthenticated(req, res, next) {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  next();
}

module.exports = {
  signToken,
  isAuthenticated,
};

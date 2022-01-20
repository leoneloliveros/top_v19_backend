const jsonwebtoken = require('jsonwebtoken');
const compose = require('composable-middleware');

const { getUserByEmail } = require('../api/user/user.service');

const config = require('../config');

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, config.secrets.session, {
    expiresIn: config.expiresIn,
  });
  return token;
}

function isAuthenticated(req, res, next) {
  return compose().use(async (req, res, next) => {
    const authHeader = req.headers?.authorization; //Bearer 1212155121562
    if (!authHeader) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    // const token = authHeader.split(' ')[1]
    const [, token] = authHeader.split(' ');

    //luego verificar()
    const payload = await validateToken(token);
    console.log(payload);
    if (!payload) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    //Attach user to request
    const user = await getUserByEmail(payload.email);

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.user = user;

    next();
  });
}

async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, config.secrets.session);
    return payload;
  } catch (error) {
    return null;
  }
}

function hasRole(roles) {
  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      const { user } = req;

      if (roles.includes(user.role)) {
        return res.status(403).json({
          message: 'forbidden',
        });
      }

      // if (!user.roles.includes(role)) {
      //   return res.status(403).json({
      //     message: 'forbidden',
      //   });
      // }

      next();
    });
}

module.exports = {
  signToken,
  isAuthenticated,
  hasRole,
};

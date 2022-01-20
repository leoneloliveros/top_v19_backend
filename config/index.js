require('dotenv').config();

const config = {
  secrets: {
    session: process.env.JWT_SECRET,
  },
  expiresIn: '1h',
};

module.exports = config;

const User = require('./user.model');

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserByEmail,
};

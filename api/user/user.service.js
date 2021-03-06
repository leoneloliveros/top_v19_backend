const User = require('./user.model');
const get = require('lodash/get');

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

async function findOneUser(query) {
  const user = await User.findOne(query);
  return user;
} // { key: value }

async function updateUser(id, user) {
  const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updateUser;
}

async function addBillingCustomerId(user, customerId) {
  const creditCards = get(user, 'billing.creditCards', []);

  const customer = {
    billing: {
      creditCards,
      customerId,
    },
  };
  const updateUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });
  return updateUser;
}

// async function updateHash(query) {
//   const user = getUserByEmail(query)
//   console.log('entro aqui');
//   try {
//     const hash = crypto
//       .createHash('sha256')
//       .update(user.email)
//       .digest('hex');

//     console.log(hash);
//     user.passwordResetToken = hash;
//     user.passwordResetExpires = Date.now() + 3600000 * 24; // Expira en 24h
//     const user = await User.updateOne(user);

//     const email = {
//       to: user.email,
//       subject: 'Activate your account',
//       template_id: 'd-7f1ed07a54f24fc1aa0cec826b1aa79b',
//       dynamic_template_data: {
//         firstName: user.firstName,
//         url: `http://localhost:3000/activate/${user.passwordResetToken}`,
//       },
//     };

//     sendEmail(email);
//     res.status()

// }

module.exports = {
  getUserByEmail,
  findOneUser,
  updateUser,
  addBillingCustomerId,
};

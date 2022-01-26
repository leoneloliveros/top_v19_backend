const epayco = require('epayco-sdk-node')({
  apiKey: 'df041f10973daf2507767dd7e17996d2',
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

async function createCardToken(creditCardInfo) {
  try {
    const { card, id, status } = await epayco.token.create(creditCardInfo);
    return { card, id, status };
  } catch (err) {
    console.log(err);
  }
}

async function createUser(userInfo) {
  try {
    const response = await epayco.customers.create(userInfo);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function makePayment(paymentInfo) {
  try {
    const response = await epayco.charge.create(paymentInfo);
    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createCardToken,
  createUser,
  makePayment,
};

const epayco = require('epayco-sdk-node')({
  apiKey: 'df041f10973daf2507767dd7e17996d2',
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

const get = require('lodash/get');

async function createCardToken(creditCardInfo) {
  return await epayco.token.create(creditCardInfo);
}
// OP 2: token_card: get(user, 'billing.creditCards[0].tokenId'),
async function createUser(user) {
  const customerInfo = {
    token_card: user?.billing?.creditCards?.[0]?.tokenId,
    name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    default: true,
  };

  // var customer_info = {
  //   token_card: "toke_id",
  //   name: "Joe",
  //   last_name: "Doe",
  //   email: "joe@payco.co",
  //   default: true
  // }
  return await epayco.customers.create(customerInfo);
}

async function makePayment(user, payment) {
  const defaultTokenId = get(user, 'billing.creditCards[0].tokenId');
  const customerId = get(user, 'billing.customerId');

  const paymentInfo = {
    token_card: defaultTokenId,
    customer_id: customerId,
    doc_type: get(payment, 'docType'),
    doc_number: get(payment, 'docNumber'),
    name: get(payment, 'name', user.firstName),
    last_name: get(payment, 'lastName', user.lastName),
    email: get(payment, 'email', user.email),
    city: get(payment, 'city'),
    address: get(payment, 'address'),
    phone: get(payment, 'phone'),
    cell_phone: get(payment, 'cellPhone'),
    bill: get(payment, 'bill'),
    description: get(payment, 'description'),
    value: get(payment, 'value'),
    tax: get(payment, 'tax'),
    tax_base: get(payment, 'taxBase'),
    currency: get(payment, 'currency'),
    dues: get(payment, 'dues'),
  };
  return await epayco.charge.create(paymentInfo);
}

module.exports = {
  createCardToken,
  createUser,
  makePayment,
};

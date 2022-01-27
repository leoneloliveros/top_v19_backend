// const { find } = require('../user/user.model');

const Payment = require('./payment.model');
const {
  createCardToken,
  createUser,
  makePayment,
} = require('./payment.service');
const { updateUser, addBillingCustomerId } = require('../user/user.service');

const get = require('lodash/get');

async function createCardTokenHandler(req, res) {
  const { cardNumber, cardExpYear, cardExpMonth, cardCvc } = req.body;
  const creditInfo = {
    'card[number]': cardNumber,
    'card[exp_year]': cardExpYear,
    'card[exp_month]': cardExpMonth,
    'card[cvc]': cardCvc,
  };

  try {
    //requerimos el servicio
    const { card, id, status } = await createCardToken(creditInfo);
    // createCustomerId => customerId
    const user = req.user;
    const creditCards = get(user, 'billing.creditCards', []);
    //agregar funcionalidad de buscar card dentro de un arreglo de objeto
    // find()
    // ...
    const customer = {
      billing: {
        creditCards: creditCards.concat({
          expMonth: card.exp_month,
          expYear: card.exp_year,
          name: card.name,
          mask: card.mask,
          tokenId: id,
        }),
        // customerId: id
      },
    };

    const response = await updateUser(req.user._id, customer);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error with token card epayco',
      error,
    });
  }
}

async function createCustomerHandler(req, res) {
  try {
    const { user } = req;
    const { data } = await createUser(user);

    await addBillingCustomerId(user, data.customerId);

    await res.status(200).json({ data });
  } catch (err) {}
}

async function createPaymentHandler(req, res) {
  try {
    const { user, body: payment } = req;
    const { data, success } = await makePayment(user, payment);

    if (!success) {
      return res.status(400).json(data);
    }

    if (!user.billing.customerId) {
      //rgistrar el usuario
      //createCardTokenHandler(...) // de aqui se va a salir
      //1. registar la terjate de credito
      //2. registrar
    }

    await Payment.create({
      userId: user._id,
      refId: data.recibo,
      bill: payment.bill,
      description: payment.description,
      value: payment.value,
      tax: payment?.tax,
      taxBase: payment?.taxBase,
    });

    await res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error });
  }
}

module.exports = {
  createCardTokenHandler,
  createCustomerHandler,
  createPaymentHandler,
};

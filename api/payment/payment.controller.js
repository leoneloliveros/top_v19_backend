const { find } = require('../user/user.model');
const { createCardToken } = require('./payment.service');
const { updateUser } = require('../user/user.service');

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
    const { card, id, status } = await createCardToken(creditInfo);
    // createCustomerId => customerId
    const user = req.user;
    const creditCards = get(user, 'billing.creditCards', []);

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

module.exports = {
  createCardTokenHandler,
};

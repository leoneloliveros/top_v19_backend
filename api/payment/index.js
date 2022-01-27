const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

const {
  createCardTokenHandler,
  createCustomerHandler,
  createPaymentHandler,
} = require('./payment.controller');

router.post('/card-token', isAuthenticated(), createCardTokenHandler);
router.post('/create-customer', isAuthenticated(), createCustomerHandler);
router.post('/make-payment', isAuthenticated(), createPaymentHandler);

module.exports = router;

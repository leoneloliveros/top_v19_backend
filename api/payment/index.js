const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

const { createCardTokenHandler } = require('./payment.controller');

router.post('/card-token', isAuthenticated(), createCardTokenHandler);
router.post('/create-customer');
router.post('/make-payment');

module.exports = router;

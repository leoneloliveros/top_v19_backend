const { Router } = require('express');

const {
  loginUserHandler,
  forgotPassword,
  verifyAccount,
} = require('./local.controller');

const router = Router();

router.post('/login', loginUserHandler);
router.post('/forgot-password', forgotPassword);
router.post('/verify-email', verifyAccount);

module.exports = router;

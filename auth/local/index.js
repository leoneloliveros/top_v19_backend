const { Router } = require('express');

const { loginUserHandler, forgotPassword } = require('./local.controller');

const router = Router();

router.post('/login', loginUserHandler);
router.post('/forgot-password', forgotPassword);

module.exports = router;

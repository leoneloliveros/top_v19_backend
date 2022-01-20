const { Router } = require('express');

const {
  createUserHandler,
  getUserByIdHandler,
  loginUserHandler,
} = require('./user.controller');

const router = Router();

router.post('/', createUserHandler);
router.post('/login', loginUserHandler);

router.get('/:id', getUserByIdHandler);

module.exports = router;

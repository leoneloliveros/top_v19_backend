const { Router } = require('express');

const { createUserHandler, getUserByIdHandler } = require('./user.controller');

const router = Router();

router.post('/', createUserHandler);
router.get('/:id', getUserByIdHandler);

module.exports = router;

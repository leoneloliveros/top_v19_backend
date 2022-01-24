const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.service');

const {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  getNoteByUserHandler,
} = require('./note.controller');

const { PayloadSchema, ParamsSchema } = require('./note.schema');

const validateRequest = require('../../middleware/validateRequest');

const router = Router();

router.get('/', getAllNotesHandler);
router.post(
  '/',
  validateRequest(PayloadSchema, 'body'),
  hasRole(['user', 'admin', 'company']),
  createNoteHandler,
);

router.get(
  '/:id',
  validateRequest(ParamsSchema, 'params'),
  isAuthenticated,
  getNoteByIdHandler,
);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', deleteNoteHandler);
router.patch(
  '/:id',
  validateRequest(ParamsSchema, 'params'),
  validateRequest(PayloadSchema, 'body'),
  updateNoteHandler,
);

module.exports = router;

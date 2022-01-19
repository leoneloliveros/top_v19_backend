const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.services');

const {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  getNoteByUserHandler,
} = require('./note.controller');

const router = Router();

router.get('/', getAllNotesHandler);
router.post('/', isAuthenticated, createNoteHandler);
router.get('/:id', getNoteByIdHandler);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', updateNoteHandler);
router.patch('/:id', deleteNoteHandler);

module.exports = router;

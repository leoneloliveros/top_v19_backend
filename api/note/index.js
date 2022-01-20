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

const router = Router();

router.get('/', getAllNotesHandler);
router.post('/', hasRole(['user', 'admin', 'company']), createNoteHandler);

router.get('/:id', isAuthenticated, getNoteByIdHandler);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', updateNoteHandler);
router.patch('/:id', deleteNoteHandler);

module.exports = router;

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

/**
 * @openapi
 * /api/notes:
 *  get:
 *    tags:
 *    - Notes
 *    summary: Get all notes
 *    description: Get all notes for student at Colombia university
 *    responses:
 *      200:
 *        description: Getting all notes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: "object"
 *                properties:
 *                  content:
 *                    type: string
 *                    description: contenido de la nota
 *                    example: Generate documentation ....
 *                  important:
 *                    type: bool
 *                    description: priority
 *                    example: false
 */

router.get('/', getAllNotesHandler);

/**
 * @openapi
 * /api/notes:
 *  post:
 *    tags:
 *    - Notes
 *    summary: Create new notes
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Note'
 *    responses:
 *      201:
 *        description: Created a new note
 *        content:
 *          application/json:
 *
 */

router.post('/', hasRole(['user', 'admin', 'company']), createNoteHandler);

router.get('/:id', isAuthenticated(), getNoteByIdHandler);
router.get('/user/:userId', getNoteByUserHandler);
router.delete('/:id', updateNoteHandler);
router.patch('/:id', deleteNoteHandler);

module.exports = router;

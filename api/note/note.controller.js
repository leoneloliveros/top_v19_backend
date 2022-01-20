const {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
  getNoteByUser,
} = require('./note.service');

async function getAllNotesHandler(req, res) {
  try {
    const notes = await getAllNotes();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getNoteByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const note = await getNoteById(id);

    if (!note) {
      return res.status(404).json({ message: `Note not found with id: ${id}` });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createNoteHandler(req, res) {
  console.log('user', req.user);
  const { user } = req; // const user = req.user

  try {
    const newNote = {
      ...req.body,
      userId: user._id,
    };
    const note = await createNote(newNote);
    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateNoteHandler(req, res) {
  const { id } = req.params;
  try {
    const note = await updateNote(id, req.body);

    if (!note) {
      return res.status(404).json({ message: `Note not found with id: ${id}` });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteNoteHandler(req, res) {
  const { id } = req.params;
  try {
    const note = await deleteNote(id);

    if (!note) {
      return res.status(404).json({ message: `Note not found with id: ${id}` });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getNoteByUserHandler(req, res) {
  const { userId } = req.params;
  try {
    const notes = await getNoteByUser(userId);
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  getNoteByUserHandler,
};

const Note = require('./note.model');

/**
 * Get all notes
 * @returns all notes
 */
async function getAllNotes() {
  try {
    const notes = await Note.find();
    return notes;
  } catch (error) {
    throw error;
  }
}

/**
 * Get note by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns note
 */
async function getNoteById(id) {
  try {
    const note = await Note.findById(id).populate({
      path: 'userId',
      select: 'name email',
    });
    return note;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new note
 * @param {Object} note Note to create
 * @returns Note created
 */
async function createNote(note) {
  try {
    const newNote = new Note(note);
    const savedNote = await newNote.save();
    return savedNote;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a note
 * @param {string} id Indentifier of the note to be updated
 * @param {*} note Body of the note to be updated
 * @returns note updated
 */
async function updateNote(id, note) {
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note);
    return updatedNote;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a note
 * @param {String} id Identifier of the note to be deleted
 * @returns Note deleted
 */
async function deleteNote(id) {
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    return deletedNote;
  } catch (error) {
    throw error;
  }
}

async function getNoteByUser(userId) {
  try {
    const notes = await Note.find({ userId });
    return notes;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
  getNoteByUser,
};

const Note = require('../models/Note');

/**
 * Fetch all notes, optionally filtered by a search query on title.
 * Uses a case-insensitive regex for server-side search.
 */
const getAllNotes = async (search = '') => {
  const filter = search
    ? { title: { $regex: search, $options: 'i' } }
    : {};
  return Note.find(filter).sort({ createdAt: -1 });
};

/** Fetch a single note by ID */
const getNoteById = async (id) => {
  return Note.findById(id);
};

/** Create a new note */
const createNote = async ({ title, description }) => {
  const note = new Note({ title, description });
  return note.save();
};

/** Update an existing note by ID */
const updateNote = async (id, { title, description }) => {
  return Note.findByIdAndUpdate(
    id,
    { title, description },
    { new: true, runValidators: true }
  );
};

/** Delete a note by ID */
const deleteNote = async (id) => {
  return Note.findByIdAndDelete(id);
};

module.exports = { getAllNotes, getNoteById, createNote, updateNote, deleteNote };

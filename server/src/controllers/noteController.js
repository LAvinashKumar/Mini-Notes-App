const noteService = require('../services/noteService');

/** GET /api/notes?search=query */
const getNotes = async (req, res, next) => {
  try {
    const { search } = req.query;
    const notes = await noteService.getAllNotes(search);
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

/** POST /api/notes */
const createNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Validate inputs
    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const note = await noteService.createNote({ title, description });
    res.status(201).json(note);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

/** PUT /api/notes/:id */
const updateNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const note = await noteService.updateNote(req.params.id, { title, description });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json(note);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

/** DELETE /api/notes/:id */
const deleteNote = async (req, res, next) => {
  try {
    const note = await noteService.deleteNote(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };

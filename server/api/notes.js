const mongoose = require('mongoose');

// ── Mongoose connection (reused across warm invocations) ──────────────────────
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// ── Note schema ───────────────────────────────────────────────────────────────
const noteSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

// ── Handler ───────────────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();

    const { method, query, body } = req;
    // Extract optional [id] from URL  e.g. /api/notes/abc123
    const id = query.id;

    // GET /api/notes?search=xxx
    if (method === 'GET' && !id) {
      const filter = query.search
        ? { title: { $regex: query.search, $options: 'i' } }
        : {};
      const notes = await Note.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(notes);
    }

    // POST /api/notes
    if (method === 'POST') {
      const { title, description } = body;
      if (!title?.trim() || !description?.trim())
        return res.status(400).json({ message: 'Title and description are required' });
      const note = await Note.create({ title, description });
      return res.status(201).json(note);
    }

    // PUT /api/notes/[id]
    if (method === 'PUT' && id) {
      const { title, description } = body;
      if (!title?.trim() || !description?.trim())
        return res.status(400).json({ message: 'Title and description are required' });
      const note = await Note.findByIdAndUpdate(id, { title, description }, { new: true, runValidators: true });
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json(note);
    }

    // DELETE /api/notes/[id]
    if (method === 'DELETE' && id) {
      const note = await Note.findByIdAndDelete(id);
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json({ message: 'Note deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

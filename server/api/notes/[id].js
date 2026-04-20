const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

const noteSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
    const { method, query, body } = req;
    const { id } = query;

    // PUT /api/notes/:id
    if (method === 'PUT') {
      const { title, description } = body;
      if (!title?.trim() || !description?.trim())
        return res.status(400).json({ message: 'Title and description are required' });
      const note = await Note.findByIdAndUpdate(
        id, { title, description }, { new: true, runValidators: true }
      );
      if (!note) return res.status(404).json({ message: 'Note not found' });
      return res.status(200).json(note);
    }

    // DELETE /api/notes/:id
    if (method === 'DELETE') {
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

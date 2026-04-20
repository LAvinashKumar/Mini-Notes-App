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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
    const { method, query, body } = req;

    // GET /api/notes?search=xxx
    if (method === 'GET') {
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

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

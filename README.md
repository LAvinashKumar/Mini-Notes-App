# 📓 Mini Notes App

A full-stack Notes application with CRUD, search, and loading states.

**Stack:** Next.js · Express · MongoDB (Mongoose) · Tailwind CSS

---

## Project Structure

```
/
├── client/                  # Next.js frontend
│   ├── src/
│   │   ├── components/      # NoteForm, NoteList, NoteCard, SearchBar, Spinner
│   │   ├── hooks/           # useNotes (all state + API logic)
│   │   ├── pages/           # index.jsx (main page), _app.jsx
│   │   ├── styles/          # globals.css (Tailwind)
│   │   └── utils/           # api.js (axios instance)
│   ├── .env.local.example
│   └── package.json
│
└── server/                  # Express backend
    ├── src/
    │   ├── config/          # db.js (Mongoose connection)
    │   ├── controllers/     # noteController.js
    │   ├── models/          # Note.js (Mongoose schema)
    │   ├── routes/          # noteRoutes.js
    │   ├── services/        # noteService.js (DB logic)
    │   └── index.js         # Entry point
    ├── .env.example
    └── package.json
```

---

## Prerequisites

- Node.js 18+
- MongoDB running locally **or** a MongoDB Atlas connection string

---

## Setup & Run

### 1. Backend

```bash
cd server
npm install

# Copy and fill in env vars
cp .env.example .env
# Edit .env — set MONGO_URI to your MongoDB connection string

npm run dev        # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install

# Copy and fill in env vars
cp .env.local.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api  (already set)

npm run dev        # starts on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /api/notes        | Get all notes (supports ?search=)  |
| POST   | /api/notes        | Create a note                      |
| PUT    | /api/notes/:id    | Update a note                      |
| DELETE | /api/notes/:id    | Delete a note                      |

---

## Features

- ✅ Create / Read / Update / Delete notes
- ✅ Server-side search by title (regex, case-insensitive)
- ✅ Client-side highlight of matching text
- ✅ Optimistic UI for deletes
- ✅ Loading spinners for all async operations
- ✅ Input validation (frontend + backend)
- ✅ Error banners with dismiss
- ✅ Responsive grid layout
- ✅ Environment variable configuration

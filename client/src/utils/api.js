import axios from 'axios';

// Base URL from environment variable (set in .env.local)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchNotes = (search = '') =>
  api.get('/notes', { params: search ? { search } : {} });

export const createNote = (data) => api.post('/notes', data);

export const updateNote = (id, data) => api.put(`/notes/${id}`, data);

export const deleteNote = (id) => api.delete(`/notes/${id}`);

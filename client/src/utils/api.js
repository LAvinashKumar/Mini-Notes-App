import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchNotes = (search = '') =>
  api.get('/notes', { params: search ? { search } : {} });

export const createNote = (data) => api.post('/notes', data);

// PUT and DELETE pass the id in the URL path
export const updateNote = (id, data) => api.put(`/notes/${id}`, data);

export const deleteNote = (id) => api.delete(`/notes/${id}`);

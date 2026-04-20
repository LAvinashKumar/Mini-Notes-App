import { useState, useEffect, useCallback } from 'react';
import * as api from '../utils/api';
import { toast } from '../components/Toast';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadNotes = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.fetchNotes(query);
      setNotes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNotes(searchQuery); }, [searchQuery, loadNotes]);

  const addNote = async (noteData) => {
    setActionLoading(true);
    try {
      const { data } = await api.createNote(noteData);
      setNotes((prev) => [data, ...prev]);
      toast.success('Note created!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create note';
      toast.error(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const editNote = async (id, noteData) => {
    setActionLoading(true);
    try {
      const { data } = await api.updateNote(id, noteData);
      setNotes((prev) => prev.map((n) => (n._id === id ? data : n)));
      toast.success('Note updated!');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update note';
      toast.error(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  };

  const removeNote = async (id) => {
    // Optimistic UI
    const previous = notes;
    setNotes((prev) => prev.filter((n) => n._id !== id));
    try {
      await api.deleteNote(id);
      toast.success('Note deleted');
    } catch (err) {
      setNotes(previous);
      toast.error(err.response?.data?.message || 'Failed to delete note');
    }
  };

  return {
    notes, loading, actionLoading, error,
    searchQuery, setSearchQuery,
    addNote, editNote, removeNote, setError,
  };
}

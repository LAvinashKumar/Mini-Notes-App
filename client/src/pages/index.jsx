import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, StickyNote, X } from 'lucide-react';
import { useNotes } from '../hooks/useNotes';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import DeleteModal from '../components/DeleteModal';

export default function Home() {
  const {
    notes, loading, actionLoading,
    searchQuery, setSearchQuery,
    addNote, editNote, removeNote,
  } = useNotes();

  const [editingNote, setEditingNote]   = useState(null);
  const [formOpen, setFormOpen]         = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // note object to confirm delete

  const handleFormSubmit = async (data) => {
    if (editingNote) {
      const result = await editNote(editingNote._id, data);
      if (result.success) { setEditingNote(null); setFormOpen(false); }
      return result;
    }
    const result = await addNote(data);
    if (result.success) setFormOpen(false);
    return result;
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteRequest = (note) => setDeleteTarget(note);

  const handleDeleteConfirm = (id) => {
    removeNote(id);
    setDeleteTarget(null);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingNote(null);
  };

  return (
    <>
      <Head>
        <title>Mini Notes</title>
        <meta name="description" content="A premium dark-mode notes app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📓</text></svg>" />
      </Head>

      <div className="min-h-screen bg-[#0b0f19]">
        {/* Ambient background glows */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
          <div className="absolute top-1/2 right-0 h-[300px] w-[300px] rounded-full bg-sky-600/8 blur-[100px]" />
        </div>

        {/* ── Header ── */}
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0b0f19]/80 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow-sm">
                <StickyNote className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-white leading-none tracking-tight">Mini Notes</h1>
                <p className="text-xs text-gray-600 mt-0.5">
                  {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                </p>
              </div>
            </div>

            {/* Center — search */}
            <div className="flex-1 flex justify-center max-w-sm">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* New Note button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setEditingNote(null); setFormOpen(f => !f); }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60 transition-shadow shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Note</span>
            </motion.button>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">

          {/* Collapsible form */}
          <AnimatePresence>
            {(formOpen || editingNote) && (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <NoteForm
                  onSubmit={handleFormSubmit}
                  editingNote={editingNote}
                  onCancelEdit={handleFormClose}
                  loading={actionLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm font-semibold text-gray-400">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Notes'}
              </h2>
              {!loading && (
                <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-400">
                  {notes.length}
                </span>
              )}
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Notes grid */}
          <NoteList
            notes={notes}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            searchQuery={searchQuery}
          />
        </main>

        {/* Footer */}
        <footer className="mt-20 pb-8 text-center text-xs text-gray-700">
          Mini Notes · Next.js · Express · MongoDB
        </footer>
      </div>

      {/* Delete confirmation modal */}
      <DeleteModal
        note={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

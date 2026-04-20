import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, X, FileText } from 'lucide-react';
import Spinner from './Spinner';

export default function NoteForm({ onSubmit, editingNote, onCancelEdit, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(editingNote);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
      setErrors({});
    } else {
      setTitle('');
      setDescription('');
      setErrors({});
    }
  }, [editingNote]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const result = await onSubmit({ title: title.trim(), description: description.trim() });
    if (result?.success && !isEditing) { setTitle(''); setDescription(''); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-2xl border border-white/10 bg-[#111827] shadow-card overflow-hidden"
    >
      {/* Top gradient bar */}
      <div className={`h-[2px] w-full ${isEditing ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400' : 'bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500'}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${isEditing ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-indigo-500/10 border border-indigo-500/20'}`}>
            <FileText className={`h-4 w-4 ${isEditing ? 'text-amber-400' : 'text-indigo-400'}`} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              {isEditing ? 'Edit Note' : 'Create Note'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEditing ? 'Update your existing note' : 'Add a new note to your collection'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors(p => ({ ...p, title: '' })); }}
              placeholder="Give your note a title…"
              disabled={loading}
              className={`input-glow w-full rounded-xl border bg-[#0f172a] px-4 py-3 text-sm text-gray-100 placeholder-gray-600 transition disabled:opacity-50 ${
                errors.title ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-white/20'
              }`}
            />
            <AnimatePresence>
              {errors.title && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-red-400 inline-block" />
                  {errors.title}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => { setDescription(e.target.value); setErrors(p => ({ ...p, description: '' })); }}
              placeholder="Write your note here…"
              rows={4}
              disabled={loading}
              className={`input-glow w-full resize-none rounded-xl border bg-[#0f172a] px-4 py-3 text-sm text-gray-100 placeholder-gray-600 transition disabled:opacity-50 ${
                errors.description ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-white/20'
              }`}
            />
            <AnimatePresence>
              {errors.description && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-red-400 inline-block" />
                  {errors.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isEditing
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-900/30 hover:shadow-amber-900/50'
                  : 'bg-gradient-to-r from-indigo-500 to-violet-600 shadow-indigo-900/40 hover:shadow-indigo-900/60'
              }`}
            >
              {loading ? <Spinner size="sm" color="white" /> : (
                isEditing ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />
              )}
              {isEditing ? 'Update Note' : 'Add Note'}
            </motion.button>

            {isEditing && (
              <motion.button
                type="button"
                onClick={onCancelEdit}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/10 transition disabled:opacity-50"
              >
                <X className="h-4 w-4" /> Cancel
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}

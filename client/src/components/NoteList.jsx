import { motion, AnimatePresence } from 'framer-motion';
import NoteCard from './NoteCard';
import SkeletonCard from './SkeletonCard';

export default function NoteList({ notes, loading, onEdit, onDelete, searchQuery }) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-28 text-center"
      >
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl">
          {searchQuery ? '🔍' : '📝'}
        </div>
        <p className="text-base font-semibold text-gray-300">
          {searchQuery ? `No results for "${searchQuery}"` : 'No notes yet'}
        </p>
        <p className="mt-2 text-sm text-gray-600 max-w-xs">
          {searchQuery
            ? 'Try searching with a different keyword'
            : 'Click "New Note" to create your first note'}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {notes.map((note, i) => (
          <NoteCard
            key={note._id}
            note={note}
            index={i}
            onEdit={onEdit}
            onDelete={onDelete}
            searchQuery={searchQuery}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

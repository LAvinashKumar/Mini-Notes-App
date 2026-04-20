import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({ note, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {note && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>

              <h3 className="text-base font-semibold text-white mb-1">Delete Note</h3>
              <p className="text-sm text-gray-400 mb-6">
                Are you sure you want to delete{' '}
                <span className="font-medium text-gray-200">"{note.title}"</span>?
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 transition"
                >
                  <X className="h-4 w-4" /> Cancel
                </button>
                <button
                  onClick={() => onConfirm(note._id)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition shadow-lg shadow-red-900/30"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import { Pencil, Trash2, Calendar } from 'lucide-react';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Accent colors per card index
const ACCENTS = [
  { dot: 'bg-indigo-400',  tag: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  glow: 'hover:shadow-indigo-900/30' },
  { dot: 'bg-violet-400',  tag: 'bg-violet-500/10 text-violet-400 border-violet-500/20',  glow: 'hover:shadow-violet-900/30' },
  { dot: 'bg-sky-400',     tag: 'bg-sky-500/10 text-sky-400 border-sky-500/20',           glow: 'hover:shadow-sky-900/30' },
  { dot: 'bg-emerald-400', tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', glow: 'hover:shadow-emerald-900/30' },
  { dot: 'bg-rose-400',    tag: 'bg-rose-500/10 text-rose-400 border-rose-500/20',        glow: 'hover:shadow-rose-900/30' },
  { dot: 'bg-amber-400',   tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20',     glow: 'hover:shadow-amber-900/30' },
];

function Highlight({ text, query }) {
  if (!query) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((p, i) =>
        regex.test(p)
          ? <mark key={i} className="rounded bg-indigo-500/30 text-indigo-200 px-0.5">{p}</mark>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

export default function NoteCard({ note, onEdit, onDelete, searchQuery, index = 0 }) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#111827] p-5 shadow-card hover:shadow-xl hover:border-white/[0.12] transition-all duration-200 cursor-default ${accent.glow}`}
    >
      {/* Accent dot */}
      <span className={`absolute top-4 right-4 h-2 w-2 rounded-full ${accent.dot} opacity-70`} />

      {/* Content */}
      <div className="pr-4 flex-1">
        <h3 className="mb-2 text-sm font-semibold text-gray-100 leading-snug line-clamp-2 break-words">
          <Highlight text={note.title} query={searchQuery} />
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-4 break-words whitespace-pre-wrap">
          {note.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${accent.tag}`}>
          <Calendar className="h-3 w-3" />
          {formatDate(note.createdAt)}
        </span>

        {/* Actions — appear on hover */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(note)}
            title="Edit note"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition"
          >
            <Pencil className="h-3.5 w-3.5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(note)}
            title="Delete note"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => onChange(local), 400);
    return () => clearTimeout(t);
  }, [local, onChange]);

  useEffect(() => { setLocal(value); }, [value]);

  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search notes…"
        className="input-glow w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-9 text-sm text-gray-200 placeholder-gray-600 transition"
        aria-label="Search notes"
      />
      {local && (
        <button
          onClick={() => { setLocal(''); onChange(''); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

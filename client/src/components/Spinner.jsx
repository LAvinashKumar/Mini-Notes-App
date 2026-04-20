export default function Spinner({ size = 'md', color = 'indigo' }) {
  const s = size === 'sm' ? 'h-4 w-4 border-2' : size === 'lg' ? 'h-10 w-10 border-[3px]' : 'h-6 w-6 border-2';
  const c = color === 'white' ? 'border-white/20 border-t-white' : 'border-indigo-900 border-t-indigo-400';
  return <div className={`${s} ${c} animate-spin rounded-full`} role="status" aria-label="Loading" />;
}

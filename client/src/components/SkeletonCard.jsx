/** Skeleton placeholder shown while notes are loading */
export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#111827] p-5 space-y-3">
      <div className="shimmer h-4 w-3/4 rounded-lg" />
      <div className="shimmer h-3 w-full rounded-lg" />
      <div className="shimmer h-3 w-5/6 rounded-lg" />
      <div className="shimmer h-3 w-2/3 rounded-lg" />
      <div className="mt-4 flex justify-between items-center">
        <div className="shimmer h-5 w-20 rounded-full" />
        <div className="shimmer h-6 w-16 rounded-lg" />
      </div>
    </div>
  );
}

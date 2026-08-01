'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-serif font-bold text-red-500 mb-4">SYSTEM ERROR</h1>
      <p className="text-white/60 font-mono text-sm uppercase tracking-widest max-w-md mb-8">
        An unexpected error occurred in the system.
      </p>
      <button 
        onClick={reset}
        className="px-6 py-3 bg-[#C9A84C] text-[#0A0F1E] font-bold uppercase tracking-widest text-xs"
      >
        Retry Protocol Sync
      </button>
    </div>
  );
}

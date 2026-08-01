export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-serif font-bold text-[#C9A84C] mb-4">404 - NOT FOUND</h1>
      <p className="text-white/60 font-mono text-sm uppercase tracking-widest max-w-md">
        The requested sector or access token could not be verified.
      </p>
    </div>
  );
}

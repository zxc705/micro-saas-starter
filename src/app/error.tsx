"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <button onClick={reset} className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">Try again</button>
      </div>
    </main>
  );
}

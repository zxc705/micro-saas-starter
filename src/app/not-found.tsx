import Link from "next/link";
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <p className="text-6xl font-bold text-gray-200">404</p>
        <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
        <Link href="/" className="mt-6 inline-block text-brand-600 hover:underline">← Back home</Link>
      </div>
    </main>
  );
}

export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 animate-pulse">
      <div className="h-9 w-64 bg-gray-200 rounded" />
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (<div key={i} className="h-32 bg-gray-100 rounded-xl" />))}
      </div>
      <div className="mt-12 h-6 w-40 bg-gray-200 rounded" />
      <div className="mt-4 h-48 bg-gray-100 rounded-xl" />
    </main>
  );
}

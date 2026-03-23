export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-14 border-b bg-background/95" />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-md bg-muted animate-pulse" />
            <div className="h-4 w-64 rounded-md bg-muted animate-pulse" />
          </div>
          <div className="h-10 w-24 rounded-md bg-muted animate-pulse" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl border p-5 space-y-2">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-8 w-12 rounded bg-muted animate-pulse" />
            </div>
          ))}
        </div>

        <div className="h-6 w-20 rounded bg-muted animate-pulse mb-4" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-muted animate-pulse" />
                <div className="h-5 w-32 rounded bg-muted animate-pulse" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted animate-pulse" />
              <div className="h-8 w-full rounded-md bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

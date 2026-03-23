export default function StudyLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-14 border-b bg-background/95" />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-xl border p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-4 w-16 rounded bg-muted animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-5 w-full rounded bg-muted animate-pulse" />
            <div className="h-5 w-4/5 rounded bg-muted animate-pulse" />
            <div className="h-5 w-3/5 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-10 w-32 rounded-md bg-muted animate-pulse mx-auto" />
        </div>
      </main>
    </div>
  );
}

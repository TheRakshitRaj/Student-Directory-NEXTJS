export default function StudentDetailLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 animate-pulse">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded mb-6"></div>

        {/* Header Card Skeleton */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 mb-6">
          <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
            <div className="h-20 w-20 rounded-2xl bg-gray-200 shrink-0"></div>
            <div className="space-y-2 flex-1">
              <div className="h-7 w-64 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="pt-6 space-y-2">
            <div className="h-3 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* 2 Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-56 rounded-2xl border border-gray-200 bg-white p-6"></div>
          <div className="h-56 rounded-2xl border border-gray-200 bg-white p-6"></div>
        </div>
      </div>
    </main>
  );
}

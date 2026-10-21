export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 animate-pulse">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-9 w-64 bg-gray-200 rounded-xl mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Stats Bar Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white border border-gray-200 rounded-xl p-4">
              <div className="h-3 w-20 bg-gray-200 rounded mb-3"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="h-28 bg-white border border-gray-200 rounded-2xl p-5 mb-8"></div>

        {/* Cards Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-14 w-14 rounded-full bg-gray-200"></div>
                  <div className="h-5 w-16 rounded-full bg-gray-200"></div>
                </div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="h-9 w-full bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

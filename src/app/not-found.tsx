import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-xs">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl mb-4 border border-blue-200">
          🎓
        </div>

        <span className="block font-mono text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
          404 • RECORD NOT LOCATED
        </span>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
          Page or Student Not Found
        </h1>

        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          The requested student profile, academic department slug, or directory path does not exist in the university registry.
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            ← Return to Student Directory
          </Link>
          <Link
            href="/departments"
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Browse Departments Directory
          </Link>
        </div>
      </div>
    </main>
  );
}

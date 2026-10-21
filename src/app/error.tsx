"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Directory Application Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow-xs">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl mb-4 border border-red-200 text-red-600">
          ⚠️
        </div>

        <span className="block font-mono text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
          APPLICATION ERROR
        </span>

        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>

        <p className="text-xs text-gray-500 leading-relaxed mb-6 font-mono bg-gray-50 p-3 rounded-lg border border-gray-200 text-left overflow-x-auto">
          {error.message || "An unexpected error occurred while processing student data."}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

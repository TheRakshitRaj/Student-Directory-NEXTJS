import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-8 text-sm text-gray-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div>
          <p>© {new Date().getFullYear()} CampusIndex — Central University Student Directory.</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Built with Next.js App Router, dynamic routes &amp; TypeScript.
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Directory
          </Link>
          <Link href="/departments" className="hover:text-blue-600 transition-colors">
            Departments
          </Link>
          <Link href="/students/new" className="hover:text-blue-600 transition-colors">
            Register Student
          </Link>
          <a
            href="/api/students"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            API Endpoint ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            🎓
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              CampusIndex
            </span>
            <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
              Student Directory
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <Link
            href="/"
            className={`rounded-lg px-3.5 py-2 transition-colors ${
              isLinkActive("/")
                ? "bg-blue-50 font-semibold text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            Directory
          </Link>

          <Link
            href="/departments"
            className={`rounded-lg px-3.5 py-2 transition-colors ${
              isLinkActive("/departments")
                ? "bg-blue-50 font-semibold text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            Departments
          </Link>

          <Link
            href="/students/new"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <span>+</span>
            <span>Add Student</span>
          </Link>
        </nav>

      </div>
    </header>
  );
}

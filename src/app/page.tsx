"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { initialStudents } from "@/data/students";
import StudentCard from "@/components/StudentCard";
import SearchBar from "@/components/SearchBar";
import StatsOverview from "@/components/StatsOverview";
import { Student } from "@/types/student";

export default function Home() {
  const [students] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "gpa" | "attendance">("name");

  // Dynamic filter lists
  const departments = useMemo(() => {
    return ["All", ...Array.from(new Set(students.map((s) => s.department)))];
  }, [students]);

  const academicYears = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];
  const statuses = ["All", "Active", "On Leave", "Graduated"];

  // Filter and sort logic
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        const matchesSearch =
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment =
          department === "All" || student.department === department;

        const matchesYear = year === "All" || student.year === year;

        const matchesStatus = status === "All" || student.status === status;

        return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "gpa") return b.gpa - a.gpa;
        if (sortBy === "attendance") return b.attendance - a.attendance;
        return a.name.localeCompare(b.name);
      });
  }, [students, search, department, year, status, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setDepartment("All");
    setYear("All");
    setStatus("All");
    setSortBy("name");
  };

  const hasActiveFilters =
    search !== "" || department !== "All" || year !== "All" || status !== "All";

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Student Directory
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse, filter, and review verified student records across university faculties.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/departments"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
            >
              <span>🏛</span>
              <span>Departments</span>
            </Link>
            <Link
              href="/students/new"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <span>+</span>
              <span>Add Student</span>
            </Link>
          </div>
        </div>

        {/* Overview Stats Bar */}
        <StatsOverview students={students} />

        {/* Search & Filters Card */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Department dropdown */}
            <div>
              <label className="block text-gray-500 font-medium mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {departments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Year dropdown */}
            <div>
              <label className="block text-gray-500 font-medium mb-1">Academic Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {academicYears.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Status dropdown */}
            <div>
              <label className="block text-gray-500 font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-gray-500 font-medium mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "gpa" | "attendance")}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="name">Name (A-Z)</option>
                <option value="gpa">Highest GPA</option>
                <option value="attendance">Highest Attendance</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <span className="text-gray-500">
                Filtered view active • Showing {filteredStudents.length} of {students.length}
              </span>
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider font-mono">
            {filteredStudents.length} Students Listed
          </p>
        </div>

        {/* Students Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center my-6">
            <span className="text-4xl block mb-2">🔍</span>
            <h3 className="text-base font-bold text-gray-800">No students match your criteria</h3>
            <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search terms or resetting the department and year filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
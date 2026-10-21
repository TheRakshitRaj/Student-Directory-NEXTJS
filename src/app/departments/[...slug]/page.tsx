import Link from "next/link";
import { notFound } from "next/navigation";
import { departmentsData } from "@/data/departments";
import { initialStudents } from "@/data/students";
import StudentCard from "@/components/StudentCard";
import type { Metadata } from "next";

interface DepartmentCatchAllProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: DepartmentCatchAllProps): Promise<Metadata> {
  const { slug } = await params;
  const deptSlug = slug[0];
  const dept = departmentsData.find((d) => d.slug === deptSlug);

  if (!dept) {
    return { title: "Department Not Found — CampusIndex" };
  }

  const yearSegment = slug[1] ? ` (${slug[1].replace("-", " ")})` : "";
  return {
    title: `${dept.name}${yearSegment} — Department Roster`,
    description: `Students and faculty details for ${dept.name}.`,
  };
}

export default async function DepartmentDetailPage({
  params,
}: DepartmentCatchAllProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const [deptSlug, yearSlug] = slug;

  const department = departmentsData.find((d) => d.slug === deptSlug);

  if (!department) {
    notFound();
  }

  // Filter students by department
  let students = initialStudents.filter(
    (s) => s.department.toLowerCase() === department.name.toLowerCase()
  );

  // If year slug provided, parse e.g. "3rd-year" -> "3rd Year"
  let activeYearFilter: string | null = null;
  if (yearSlug) {
    activeYearFilter = yearSlug.replace("-", " ");
    students = students.filter(
      (s) => s.year.toLowerCase() === activeYearFilter?.toLowerCase()
    );
  }

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Breadcrumb with Route Trace */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Directory</Link>
            <span>/</span>
            <Link href="/departments" className="hover:text-blue-600 transition-colors">Departments</Link>
            <span>/</span>
            <Link
              href={`/departments/${department.slug}`}
              className={!yearSlug ? "text-gray-900 font-bold" : "hover:text-blue-600"}
            >
              {department.name}
            </Link>
            {yearSlug && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-bold capitalize">{activeYearFilter}</span>
              </>
            )}
          </div>

          <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-700 border border-blue-200">
            Route: /departments/{slug.join("/")}
          </span>
        </div>

        {/* Department Banner Card */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="rounded-lg bg-blue-600 px-3 py-1 font-mono text-sm font-bold text-white shadow-xs">
                  {department.code}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {department.location}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {department.name}
              </h1>
              <p className="mt-1 text-sm text-gray-600 max-w-2xl leading-relaxed">
                {department.description}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 shrink-0 text-xs space-y-1">
              <p className="text-gray-400 font-mono">Department Head:</p>
              <p className="font-bold text-gray-900">{department.head}</p>
              <p className="text-blue-600">{department.email}</p>
            </div>
          </div>

          {/* Sub-path Year Navigation Pills */}
          <div className="pt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-400 font-medium mr-1">Filter by Year:</span>
            
            <Link
              href={`/departments/${department.slug}`}
              className={`rounded-full px-3.5 py-1.5 transition-colors font-medium ${
                !yearSlug
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Years
            </Link>

            {yearOptions.map((yr) => {
              const yrSlug = yr.toLowerCase().replace(" ", "-");
              const isSelected = activeYearFilter?.toLowerCase() === yr.toLowerCase();

              return (
                <Link
                  key={yr}
                  href={`/departments/${department.slug}/${yrSlug}`}
                  className={`rounded-full px-3.5 py-1.5 transition-colors font-medium ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {yr}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {activeYearFilter ? `${activeYearFilter} Students` : "Enrolled Students"}
            <span className="ml-2 font-mono text-xs font-normal text-gray-400">
              ({students.length} found)
            </span>
          </h2>

          <Link
            href="/departments"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            ← View All Departments
          </Link>
        </div>

        {/* Students Grid */}
        {students.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center my-6">
            <span className="text-3xl block mb-2">📋</span>
            <h3 className="text-base font-bold text-gray-800">No students found</h3>
            <p className="mt-1 text-xs text-gray-500">
              There are currently no students matching this specific department and academic year.
            </p>
            <Link
              href={`/departments/${department.slug}`}
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Clear Year Filter
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}

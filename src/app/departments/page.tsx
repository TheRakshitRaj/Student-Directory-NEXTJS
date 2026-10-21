import Link from "next/link";
import { departmentsData } from "@/data/departments";
import { initialStudents } from "@/data/students";
import DepartmentCard from "@/components/DepartmentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Departments — CampusIndex",
  description: "Browse academic faculties and departments.",
};

export default function DepartmentsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        /* Breadcrumb */
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-mono">
          <Link href="/" className="hover:text-blue-600 transition-colors">Directory</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Departments</span>
        </div>

        // Header 
        <div className="mb-8">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            ACADEMIC DIVISIONS
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Faculties &amp; Departments
          </h1>
          <p className="mt-1 text-sm text-gray-500 max-w-2xl">
            Explore academic departments, faculty leadership, and specialized curriculum divisions across campus.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departmentsData.map((dept) => {
            const studentCount = initialStudents.filter(
              (s) => s.department === dept.name
            ).length;

            return (
              <DepartmentCard
                key={dept.id}
                department={dept}
                studentCount={studentCount}
              />
            );
          })}
        </div>

        {/* Nested Routing Helper Box */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-600 font-bold">⚡</span>
            <h2 className="text-sm font-bold text-gray-900">
              Catch-All Dynamic Routing Demo (<code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">/departments/[...slug]</code>)
            </h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Click through to test hierarchical sub-path parsing for departments and academic years:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <Link
              href="/departments/computer-engineering"
              className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              /departments/computer-engineering
            </Link>
            <Link
              href="/departments/computer-engineering/3rd-year"
              className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              /departments/computer-engineering/3rd-year
            </Link>
            <Link
              href="/departments/information-technology/2nd-year"
              className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              /departments/information-technology/2nd-year
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

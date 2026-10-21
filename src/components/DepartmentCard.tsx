import Link from "next/link";
import { Department } from "@/types/student";

interface DepartmentCardProps {
  department: Department;
  studentCount?: number;
}

export default function DepartmentCard({
  department,
  studentCount = 0,
}: DepartmentCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="rounded-lg bg-blue-100 px-2.5 py-1 font-mono text-xs font-bold text-blue-700">
            {department.code}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {studentCount} Students
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {department.name}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">
          {department.description}
        </p>

        <div className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-xs text-gray-600">
          <p>
            <span className="text-gray-400">Head:</span> {department.head}
          </p>
          <p>
            <span className="text-gray-400">Location:</span> {department.location}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
        <Link
          href={`/departments/${department.slug}`}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
        >
          <span>View Students</span>
          <span>→</span>
        </Link>
        <span className="text-[11px] text-gray-400 font-mono">
          /departments/{department.slug}
        </span>
      </div>
    </div>
  );
}

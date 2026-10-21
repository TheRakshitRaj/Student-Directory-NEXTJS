import Link from "next/link";
import { Student } from "@/types/student";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "On Leave":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Graduated":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
      <div>
        {/* Top Header: Avatar + Status + Roll Number */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700 group-hover:scale-105 transition-transform">
            {student.name.charAt(0)}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${getStatusColor(
                student.status
              )}`}
            >
              {student.status}
            </span>
            <span className="font-mono text-[10px] text-gray-400">
              {student.rollNumber}
            </span>
          </div>
        </div>

        {/* Student Name */}
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {student.name}
        </h2>

        {/* Email */}
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">{student.email}</p>

        {/* Department & Year */}
        <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-3 text-xs">
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-gray-400">Department:</span>
            <span className="font-medium text-gray-800 text-right">{student.department}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-gray-400">Year:</span>
            <span className="font-medium text-gray-800">{student.year}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-gray-400">GPA:</span>
            <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">
              {student.gpa.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] text-gray-400">
          Attendance: {student.attendance}%
        </span>
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <span>View Profile</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

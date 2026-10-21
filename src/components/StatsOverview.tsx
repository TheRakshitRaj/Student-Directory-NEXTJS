import { Student } from "@/types/student";

interface StatsOverviewProps {
  students: Student[];
}

export default function StatsOverview({ students }: StatsOverviewProps) {
  const totalStudents = students.length;
  const uniqueDepartments = new Set(students.map((s) => s.department)).size;
  const activeCount = students.filter((s) => s.status === "Active").length;
  const avgGpa =
    totalStudents > 0
      ? (students.reduce((acc, curr) => acc + curr.gpa, 0) / totalStudents).toFixed(2)
      : "0.00";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
        <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">
          Total Students
        </span>
        <div className="mt-1 text-2xl font-bold text-gray-900">{totalStudents}</div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
        <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">
          Departments
        </span>
        <div className="mt-1 text-2xl font-bold text-blue-600">{uniqueDepartments}</div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
        <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">
          Active Enrolled
        </span>
        <div className="mt-1 text-2xl font-bold text-emerald-600">
          {activeCount}
          <span className="text-xs text-gray-400 font-normal ml-1">
            ({Math.round((activeCount / (totalStudents || 1)) * 100)}%)
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
        <span className="text-xs text-gray-400 uppercase font-mono tracking-wider">
          Average GPA
        </span>
        <div className="mt-1 text-2xl font-bold text-purple-600">{avgGpa}</div>
      </div>
    </div>
  );
}

import { NextResponse } from "next/server";
import { departmentsData } from "@/data/departments";
import { studentsStore } from "@/lib/studentsStore";

export async function GET() {
  const students = studentsStore.getAll();

  const departmentsWithStats = departmentsData.map((dept) => {
    const deptStudents = students.filter((s) => s.department === dept.name);
    const count = deptStudents.length;
    const avgGpa =
      count > 0
        ? Number((deptStudents.reduce((acc, curr) => acc + curr.gpa, 0) / count).toFixed(2))
        : 0;

    return {
      ...dept,
      totalStudents: count,
      avgGpa,
    };
  });

  return NextResponse.json({
    success: true,
    count: departmentsWithStats.length,
    data: departmentsWithStats,
  });
}

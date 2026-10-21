import Link from "next/link";
import { notFound } from "next/navigation";
import { initialStudents } from "@/data/students";
import type { Metadata } from "next";

interface StudentProfileProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all known students to optimize SSG
export async function generateStaticParams() {
  return initialStudents.map((student) => ({
    id: student.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: StudentProfileProps): Promise<Metadata> {
  const { id } = await params;
  const student = initialStudents.find((s) => s.id === Number(id));

  if (!student) {
    return {
      title: "Student Not Found — CampusIndex",
    };
  }

  return {
    title: `${student.name} (${student.rollNumber}) — Student Profile`,
    description: `Profile and academic records for ${student.name}, ${student.department}.`,
  };
}

export default async function StudentProfile({ params }: StudentProfileProps) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId)) {
    notFound();
  }

  const student = initialStudents.find((item) => item.id === numId);

  if (!student) {
    notFound();
  }

  const getStatusColor = (status: string) => {
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
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        
        {/* Navigation & Breadcrumb */}
        <div className="mb-6 flex items-center justify-between text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Directory</Link>
            <span>/</span>
            <Link href="/departments" className="hover:text-blue-600 transition-colors">
              {student.department}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{student.name}</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <span>←</span>
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Profile Card Container */}
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
              
              <div className="flex items-center gap-5">
                {/* Large Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-extrabold text-white shadow-md">
                  {student.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                      {student.name}
                    </h1>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {student.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    {student.department} • <strong className="text-gray-700 font-medium">{student.year}</strong>
                  </p>
                  <p className="font-mono text-xs text-blue-600 mt-0.5">
                    ID: {student.rollNumber}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${student.email}`}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-xs"
                >
                  ✉ Send Email
                </a>
                <a
                  href={`tel:${student.phone}`}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-xs"
                >
                  📞 Contact
                </a>
              </div>

            </div>

            {/* Bio */}
            <div className="pt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-2">
                Student Biography &amp; Focus
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {student.bio}
              </p>
            </div>
          </div>

          {/* 2-Column Grid: Academic Metrics & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Academic Standing & Attendance */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Academic Performance</span>
                <span className="text-xs font-mono text-gray-400">AY 2025-2026</span>
              </h3>

              <div className="space-y-4">
                {/* GPA */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500 font-medium">Cumulative GPA:</span>
                    <span className="font-mono font-bold text-base text-blue-700">
                      {student.gpa.toFixed(2)} <span className="text-xs text-gray-400">/ 4.00</span>
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${(student.gpa / 4.0) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Attendance */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500 font-medium">Semester Attendance:</span>
                    <span className="font-mono font-bold text-gray-800">
                      {student.attendance}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        student.attendance >= 90
                          ? "bg-emerald-500"
                          : student.attendance >= 80
                          ? "bg-blue-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${student.attendance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Faculty Advisor */}
                <div className="pt-2 border-t border-gray-100 text-xs flex items-center justify-between">
                  <span className="text-gray-400">Faculty Advisor:</span>
                  <span className="font-semibold text-gray-800">{student.advisor}</span>
                </div>

                {/* Enrollment Date */}
                <div className="text-xs flex items-center justify-between">
                  <span className="text-gray-400">Enrollment Date:</span>
                  <span className="font-mono text-gray-600">{student.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Box 2: Contact & Official Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Contact &amp; Administrative Data
              </h3>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">University Email:</span>
                  <span className="font-mono text-gray-900 font-medium">{student.email}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Contact Number:</span>
                  <span className="font-mono text-gray-900">{student.phone}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-400">Academic Standing:</span>
                  <span className="font-semibold text-emerald-600">Good Standing</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-gray-400">Department Code:</span>
                  <span className="font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {student.department.split(" ").map((w) => w[0]).join("")}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Enrolled Courses & Technical Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Courses */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Enrolled Courses</span>
                <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-[10px] font-bold">
                  {student.courses.length} Active
                </span>
              </h3>

              <ul className="space-y-2 text-xs">
                {student.courses.map((course, idx) => (
                  <li
                    key={course}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <span className="font-medium text-gray-800">{course}</span>
                    <span className="font-mono text-[10px] text-gray-400">
                      SEC-0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Skills &amp; Competencies
              </h3>

              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-200/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Verified by Academic Registrar</span>
                <span>Audit Stamp: ✔ PASS</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

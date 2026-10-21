"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { departmentsData } from "@/data/departments";
import { AcademicYear } from "@/types/student";

export default function NewStudentPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState(departmentsData[0].name);
  const [year, setYear] = useState<AcademicYear>("1st Year");
  const [gpa, setGpa] = useState("3.50");
  const [attendance, setAttendance] = useState("95");
  const [bio, setBio] = useState("");
  const [coursesInput, setCoursesInput] = useState("Algorithm Design, Data Structures");
  const [skillsInput, setSkillsInput] = useState("TypeScript, React, Python");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const courses = coursesInput.split(",").map((s) => s.trim()).filter(Boolean);
    const skills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          department,
          year,
          gpa: parseFloat(gpa) || 3.5,
          attendance: parseInt(attendance) || 95,
          bio,
          courses,
          skills,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to register student");
      }

      setSuccess(data.data.id);
      setTimeout(() => {
        router.push(`/students/${data.data.id}`);
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Directory</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Register Student</span>
          </div>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Cancel
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xs">
          
          <div className="mb-6 pb-4 border-b border-gray-100">
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
              ADMISSIONS &amp; ENROLLMENT
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Register New Student
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Add a new student profile to the campus directory registry and backend API.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-800">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center justify-between">
              <span>✓ Student registered successfully! Redirecting to profile #{success}...</span>
              <Link href={`/students/${success}`} className="font-bold underline ml-2">
                View Now →
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Dave"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  University Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priyanshu@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Department & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  {departmentsData.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value as AcademicYear)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>

            {/* Phone & GPA & Attendance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9876543299"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  GPA (out of 4.00)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="3.80"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Attendance (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="95"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Courses & Skills */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Enrolled Courses (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Computing, Database Systems, Computer Networks"
                  value={coursesInput}
                  onChange={(e) => setCoursesInput(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Skills &amp; Technologies (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Python, Docker, Next.js, Kubernetes"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1.5">
                  Brief Biography
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description of student interests, research projects, or extracurricular focus..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                href="/"
                className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Registering..." : "Submit Registration"}
              </button>
            </div>

          </form>

        </div>

      </div>
    </main>
  );
}

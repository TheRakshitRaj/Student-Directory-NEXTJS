import { NextRequest, NextResponse } from "next/server";
import { studentsStore } from "@/lib/studentsStore";
import { AcademicYear, EnrollmentStatus, Student } from "@/types/student";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const department = searchParams.get("department") || "All";
  const year = searchParams.get("year") || "All";
  const status = searchParams.get("status") || "All";
  const sortBy = searchParams.get("sortBy") || "name";

  let results = studentsStore.getAll();

  if (search) {
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.rollNumber.toLowerCase().includes(search)
    );
  }

  if (department !== "All") {
    results = results.filter((s) => s.department === department);
  }

  if (year !== "All") {
    results = results.filter((s) => s.year === year);
  }

  if (status !== "All") {
    results = results.filter((s) => s.status === status);
  }

  // Sorting
  results = [...results].sort((a, b) => {
    if (sortBy === "gpa") return b.gpa - a.gpa;
    if (sortBy === "attendance") return b.attendance - a.attendance;
    if (sortBy === "year") return a.year.localeCompare(b.year);
    return a.name.localeCompare(b.name);
  });

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.department || !body.year) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, department, year" },
        { status: 400 }
      );
    }

    const newStudent = studentsStore.create({
      rollNumber: body.rollNumber || `ST-${Date.now().toString().slice(-4)}`,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone || "N/A",
      department: body.department,
      year: body.year as AcademicYear,
      gpa: Number(body.gpa) || 3.5,
      status: (body.status as EnrollmentStatus) || "Active",
      bio: body.bio || "Student enrolled at university.",
      courses: Array.isArray(body.courses) ? body.courses : ["Foundations of Computing"],
      skills: Array.isArray(body.skills) ? body.skills : ["Problem Solving"],
      advisor: body.advisor || "Faculty Advisor",
      attendance: Number(body.attendance) || 95,
      joinedDate: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json(
      { success: true, message: "Student registered successfully", data: newStudent },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON request body" },
      { status: 400 }
    );
  }
}

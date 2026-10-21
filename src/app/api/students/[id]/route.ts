import { NextRequest, NextResponse } from "next/server";
import { studentsStore } from "@/lib/studentsStore";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: "Invalid student ID" }, { status: 400 });
  }

  const student = studentsStore.getById(numId);

  if (!student) {
    return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: student });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: "Invalid student ID" }, { status: 400 });
  }

  const deleted = studentsStore.delete(numId);

  if (!deleted) {
    return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: `Student #${id} removed` });
}

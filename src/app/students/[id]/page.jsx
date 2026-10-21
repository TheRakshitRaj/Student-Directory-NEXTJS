import Link from "next/link";
import students from "../../../data/students";
import { notFound } from "next/navigation";

export default async function StudentProfile({ params }) {
    const { id } = await params;

    const student = students.find(
        (item) => item.id === Number(id)
    );

    if (!student) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-xl rounded-xl border bg-white p-8">
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Back to Students
                </Link>

                <div className="my-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
                    {student.name.charAt(0)}
                </div>

                <h1 className="text-2xl font-bold">{student.name}</h1>

                <div className="mt-6 space-y-3 text-gray-600">
                    <p>Email: {student.email}</p>
                    <p>Phone: {student.phone}</p>
                    <p>Department: {student.department}</p>
                    <p>Academic Year: {student.year}</p>
                </div>
            </div>
        </main>
    );
}
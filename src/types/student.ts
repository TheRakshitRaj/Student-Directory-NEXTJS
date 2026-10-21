export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year" | "4th Year";

export type EnrollmentStatus = "Active" | "On Leave" | "Graduated";

export interface Student {
  id: number;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: AcademicYear;
  gpa: number;
  status: EnrollmentStatus;
  bio: string;
  avatar?: string;
  courses: string[];
  skills: string[];
  advisor: string;
  attendance: number;
  joinedDate: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  code: string;
  head: string;
  email: string;
  location: string;
  description: string;
}

export interface StudentFilters {
  search: string;
  department: string;
  year: string;
  status: string;
  sortBy: "name" | "gpa" | "year" | "attendance";
}

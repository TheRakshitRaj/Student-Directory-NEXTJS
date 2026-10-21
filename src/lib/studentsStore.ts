import { Student } from "@/types/student";
import { initialStudents } from "@/data/students";

// Global in-memory storage for students during dev runtime
declare global {
  // eslint-disable-next-line no-var
  var __students_store__: Student[] | undefined;
}

if (!globalThis.__students_store__) {
  globalThis.__students_store__ = [...initialStudents];
}

export const studentsStore = {
  getAll: (): Student[] => {
    return globalThis.__students_store__ || initialStudents;
  },

  getById: (id: number): Student | undefined => {
    return (globalThis.__students_store__ || initialStudents).find((s) => s.id === id);
  },

  create: (student: Omit<Student, "id">): Student => {
    const store = globalThis.__students_store__ || initialStudents;
    const newId = store.length > 0 ? Math.max(...store.map((s) => s.id)) + 1 : 1;
    const newStudent: Student = {
      ...student,
      id: newId,
    };
    store.unshift(newStudent);
    return newStudent;
  },

  delete: (id: number): boolean => {
    const store = globalThis.__students_store__ || initialStudents;
    const index = store.findIndex((s) => s.id === id);
    if (index !== -1) {
      store.splice(index, 1);
      return true;
    }
    return false;
  },

  reset: () => {
    globalThis.__students_store__ = [...initialStudents];
  }
};

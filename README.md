# 🎓 CampusIndex — Central Student Directory

A modern, full-featured Student Directory and Academic Administration portal built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**.

---

## 📋 Architectural Overview & Routing Strategy

This application is built in compliance with Next.js App Router conventions, incorporating static routes, dynamic parameter routes, catch-all routes, and route handlers.

### 1. Routes & Page Hierarchy

| Route Path | Type | Description | Rendering Strategy |
| :--- | :--- | :--- | :--- |
| `/` | Static / Client | Student Directory dashboard with search, multi-faceted filtering (Department, Year, Status), sorting, and metrics. | Client-side reactive with SSG initial shell |
| `/departments` | Static | Comprehensive catalog of all university faculties, heads of departments, and location indices. | Static Site Generation (SSG) |
| `/departments/[...slug]` | Catch-All Dynamic | Hierarchical department explorer. Supports `/departments/[dept]` and `/departments/[dept]/[year]` (e.g. `/departments/computer-engineering/3rd-year`). | Dynamic Server-Side Rendering / Catch-All |
| `/students/[id]` | Dynamic Route | Comprehensive individual student profile including enrolled courses, cumulative GPA progress, attendance, and administrative info. | Static Site Generation (SSG via `generateStaticParams`) with on-demand fallback |
| `/students/new` | Static / Interactive | Form for registering a new student, with client-side validation and backend API persistence. | Client Component (`"use client"`) |
| `/api/students` | Route Handler (API) | `GET` (with query filtering) and `POST` (create new student). | Server Route Handler |
| `/api/students/[id]` | Route Handler (API) | `GET` by ID and `DELETE` by ID. | Server Route Handler |
| `/api/departments` | Route Handler (API) | `GET` departments list with computed analytics. | Server Route Handler |

---

## 🗂 Folder & Component Structure

```text
student-directory/
├── src/
│   ├── app/
│   │   ├── api/                          # Route Handlers (Backend API)
│   │   │   ├── departments/
│   │   │   │   └── route.ts              # GET /api/departments
│   │   │   └── students/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts          # GET, DELETE /api/students/[id]
│   │   │       └── route.ts              # GET, POST /api/students
│   │   ├── departments/
│   │   │   ├── [...slug]/
│   │   │   │   └── page.tsx              # Catch-All: /departments/[dept]/[year]
│   │   │   └── page.tsx                  # Static: /departments
│   │   ├── students/
│   │   │   ├── [id]/
│   │   │   │   ├── loading.tsx           # Route-level Skeleton Loader
│   │   │   │   └── page.tsx              # Dynamic: /students/[id] (SSG)
│   │   │   └── new/
│   │   │       └── page.tsx              # Interactive Form: /students/new
│   │   ├── error.tsx                     # Global Error Boundary
│   │   ├── loading.tsx                   # Global Loading Skeleton
│   │   ├── not-found.tsx                 # Custom 404 Handler
│   │   ├── globals.css                   # Tailwind CSS styling
│   │   ├── layout.tsx                    # Shared Root Layout with Navbar & Footer
│   │   └── page.tsx                      # Root Student Directory Dashboard
│   ├── components/
│   │   ├── Navbar.tsx                    # Shared Header Navigation
│   │   ├── Footer.tsx                    # Shared Footer
│   │   ├── SearchBar.tsx                 # Debounced Search Input with Clear Action
│   │   ├── StudentCard.tsx               # Reusable Student Profile Card
│   │   ├── DepartmentCard.tsx            # Reusable Department Summary Card
│   │   └── StatsOverview.tsx             # Real-time Metrics Dashboard Card
│   ├── data/
│   │   ├── students.ts                   # 12+ realistic typed student records
│   │   └── departments.ts                # University academic departments
│   ├── lib/
│   │   └── studentsStore.ts              # In-memory mutable store for API interactions
│   └── types/
│       └── student.ts                    # TypeScript models (Student, Department, Filters)
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛠 Features & Capabilities

- **Unified Navigation & Layout**: Persistent, responsive header and footer with active tab indicators.
- **Search & Advanced Filtering**: Filter in real-time by search query (name, email, roll number), department, academic year (1st–4th Year), and enrollment status (Active, On Leave, Graduated).
- **Sorting Options**: Sort dynamically by Name (A-Z), Cumulative GPA, and Attendance Rate.
- **Catch-All Routing**: Test Next.js segment parsing with `/departments/[...slug]` to filter department students by academic year through URLs.
- **Student Profile**: Dynamic `[id]` pages generated at build time using `generateStaticParams()` for optimal performance.
- **Resilient UI States**:
  - Global `loading.tsx` and route-specific `students/[id]/loading.tsx` skeletons.
  - Custom `not-found.tsx` triggered by `notFound()` when an invalid student ID or department slug is accessed.
  - Interactive `error.tsx` boundary with a "Try Again" recovery action.
- **Backend API Integration**: Built-in REST endpoints (`/api/students`, `/api/departments`) supporting GET, POST, and DELETE requests.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will be live at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Verify that all static pages and dynamic routes generate cleanly without TypeScript or linting errors.

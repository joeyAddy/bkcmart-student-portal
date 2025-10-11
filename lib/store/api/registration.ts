import { baseApi } from "./base";

export interface RegistrationCourse {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  department: string;
  instructor: string;
  semester: "fall" | "spring";
  prerequisites?: string[];
  description: string;
  schedule: {
    days: string[];
    time: string;
    location: string;
  };
  maxCapacity: number;
  currentEnrollment: number;
  status: "available" | "full" | "waitlist";
}

export interface RegistrationCart {
  studentId: string;
  fallCourses: RegistrationCourse[];
  springCourses: RegistrationCourse[];
  totalCredits: {
    fall: number;
    spring: number;
    year: number;
  };
}

export interface RegistrationRequest {
  studentId: string;
  courseIds: string[];
  semester: "fall" | "spring";
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  registeredCourses: RegistrationCourse[];
  conflicts?: string[];
}

// Mock data for available courses
const mockCourses: RegistrationCourse[] = [
  {
    id: "cs101",
    courseCode: "CS 101",
    courseName: "Introduction to Computer Science",
    credits: 3,
    department: "Computer Science",
    instructor: "Dr. Smith",
    semester: "fall",
    description:
      "Basic concepts of computer science and programming fundamentals.",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "9:00 AM - 10:00 AM",
      location: "CS Building - Room 101",
    },
    maxCapacity: 30,
    currentEnrollment: 25,
    status: "available",
  },
  {
    id: "cs102",
    courseCode: "CS 102",
    courseName: "Data Structures and Algorithms",
    credits: 4,
    department: "Computer Science",
    instructor: "Dr. Johnson",
    semester: "spring",
    prerequisites: ["CS 101"],
    description:
      "Study of data structures, algorithms, and their applications.",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "2:00 PM - 4:00 PM",
      location: "CS Building - Room 201",
    },
    maxCapacity: 25,
    currentEnrollment: 20,
    status: "available",
  },
  {
    id: "math201",
    courseCode: "MATH 201",
    courseName: "Calculus I",
    credits: 4,
    department: "Mathematics",
    instructor: "Prof. Davis",
    semester: "fall",
    description:
      "Differential and integral calculus of functions of one variable.",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "10:00 AM - 11:30 AM",
      location: "Math Building - Room 150",
    },
    maxCapacity: 40,
    currentEnrollment: 35,
    status: "available",
  },
  {
    id: "math202",
    courseCode: "MATH 202",
    courseName: "Calculus II",
    credits: 4,
    department: "Mathematics",
    instructor: "Prof. Davis",
    semester: "spring",
    prerequisites: ["MATH 201"],
    description:
      "Continuation of calculus including series and multivariable functions.",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "10:00 AM - 11:30 AM",
      location: "Math Building - Room 150",
    },
    maxCapacity: 40,
    currentEnrollment: 30,
    status: "available",
  },
  {
    id: "phys101",
    courseCode: "PHYS 101",
    courseName: "General Physics I",
    credits: 3,
    department: "Physics",
    instructor: "Dr. Wilson",
    semester: "fall",
    description: "Mechanics, heat, and thermodynamics.",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "1:00 PM - 2:30 PM",
      location: "Physics Building - Room 101",
    },
    maxCapacity: 35,
    currentEnrollment: 35,
    status: "full",
  },
  {
    id: "phys102",
    courseCode: "PHYS 102",
    courseName: "General Physics II",
    credits: 3,
    department: "Physics",
    instructor: "Dr. Wilson",
    semester: "spring",
    prerequisites: ["PHYS 101"],
    description: "Electricity, magnetism, and optics.",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "1:00 PM - 2:30 PM",
      location: "Physics Building - Room 101",
    },
    maxCapacity: 35,
    currentEnrollment: 25,
    status: "available",
  },
  {
    id: "eng101",
    courseCode: "ENG 101",
    courseName: "English Composition",
    credits: 3,
    department: "English",
    instructor: "Prof. Brown",
    semester: "fall",
    description: "Writing skills and composition techniques.",
    schedule: {
      days: ["Monday", "Wednesday"],
      time: "2:00 PM - 3:30 PM",
      location: "Liberal Arts - Room 205",
    },
    maxCapacity: 25,
    currentEnrollment: 20,
    status: "available",
  },
  {
    id: "eng102",
    courseCode: "ENG 102",
    courseName: "Literature and Critical Thinking",
    credits: 3,
    department: "English",
    instructor: "Prof. Brown",
    semester: "spring",
    prerequisites: ["ENG 101"],
    description:
      "Analysis of literary works and development of critical thinking skills.",
    schedule: {
      days: ["Monday", "Wednesday"],
      time: "2:00 PM - 3:30 PM",
      location: "Liberal Arts - Room 205",
    },
    maxCapacity: 25,
    currentEnrollment: 18,
    status: "available",
  },
  {
    id: "hist101",
    courseCode: "HIST 101",
    courseName: "World History I",
    credits: 3,
    department: "History",
    instructor: "Dr. Taylor",
    semester: "fall",
    description: "Survey of world history from ancient times to 1500.",
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "11:00 AM - 12:30 PM",
      location: "Liberal Arts - Room 301",
    },
    maxCapacity: 30,
    currentEnrollment: 22,
    status: "available",
  },
  {
    id: "bio101",
    courseCode: "BIO 101",
    courseName: "General Biology",
    credits: 4,
    department: "Biology",
    instructor: "Dr. Garcia",
    semester: "spring",
    description:
      "Introduction to biological principles and laboratory techniques.",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "1:00 PM - 3:00 PM",
      location: "Science Building - Room 120",
    },
    maxCapacity: 24,
    currentEnrollment: 24,
    status: "full",
  },
];

export const registrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableCourses: builder.query<
      RegistrationCourse[],
      { semester?: "fall" | "spring" | "all"; department?: string }
    >({
      queryFn: async ({ semester = "all", department }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filteredCourses = mockCourses;

        if (semester !== "all") {
          filteredCourses = filteredCourses.filter(
            (course) => course.semester === semester
          );
        }

        if (department) {
          filteredCourses = filteredCourses.filter((course) =>
            course.department.toLowerCase().includes(department.toLowerCase())
          );
        }

        return { data: filteredCourses };
      },
      providesTags: ["Course"],
    }),

    registerForCourses: builder.mutation<
      RegistrationResponse,
      RegistrationRequest
    >({
      queryFn: async ({ courseIds, semester }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const registeredCourses = mockCourses.filter(
          (course) =>
            courseIds.includes(course.id) && course.semester === semester
        );

        // Check for conflicts (simplified logic)
        const conflicts: string[] = [];
        const timeSlots = new Set<string>();

        registeredCourses.forEach((course) => {
          const timeKey = `${course.schedule.days.join("-")}-${
            course.schedule.time
          }`;
          if (timeSlots.has(timeKey)) {
            conflicts.push(`Time conflict with ${course.courseName}`);
          } else {
            timeSlots.add(timeKey);
          }
        });

        return {
          data: {
            success: conflicts.length === 0,
            message:
              conflicts.length === 0
                ? "Successfully registered for courses"
                : "Registration completed with conflicts",
            registeredCourses,
            conflicts: conflicts.length > 0 ? conflicts : undefined,
          },
        };
      },
      invalidatesTags: ["Registration"],
    }),

    getRegistrationCart: builder.query<RegistrationCart, string>({
      queryFn: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Mock empty cart initially
        return {
          data: {
            studentId: "current-student",
            fallCourses: [],
            springCourses: [],
            totalCredits: {
              fall: 0,
              spring: 0,
              year: 0,
            },
          },
        };
      },
      providesTags: ["Registration"],
    }),
  }),
});

export const {
  useGetAvailableCoursesQuery,
  useRegisterForCoursesMutation,
  useGetRegistrationCartQuery,
} = registrationApi;

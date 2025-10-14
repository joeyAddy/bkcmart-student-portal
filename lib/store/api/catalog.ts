import { baseApi } from "./base";

export interface CatalogCourse {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  department: string;
  level: "undergraduate" | "graduate";
  courseLevel: number; // 100, 200, 300, 400, etc.
  description: string;
  longDescription: string;
  prerequisites: string[];
  corequisites?: string[];
  instructor: string;
  instructorEmail: string;
  maxCapacity: number;
  currentEnrollment: number;
  status: "active" | "inactive" | "cancelled";
  schedule: {
    fall?: {
      days: string[];
      time: string;
      location: string;
    };
    spring?: {
      days: string[];
      time: string;
      location: string;
    };
  };
  tags: string[];
  objectives: string[];
  requirements: string[];
  textbooks?: {
    title: string;
    author: string;
    isbn: string;
    required: boolean;
  }[];
  assessments: {
    type: string;
    weight: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CatalogFilters {
  search: string;
  department: string;
  level: "all" | "undergraduate" | "graduate";
  courseLevel: string; // '100', '200', '300', '400', 'all'
  credits: string; // '1', '2', '3', '4', '5+', 'all'
  status: "all" | "active" | "inactive";
  hasPrerequisites: boolean | null;
}

export interface CatalogStats {
  totalCourses: number;
  activeCourses: number;
  departmentCounts: Record<string, number>;
  levelCounts: Record<string, number>;
  creditDistribution: Record<string, number>;
}

// Mock data for comprehensive course catalog
const mockCatalogCourses: CatalogCourse[] = [
  {
    id: "cs101",
    courseCode: "CS 101",
    courseName: "Introduction to Computer Science",
    credits: 3,
    department: "Computer Science",
    level: "undergraduate",
    courseLevel: 100,
    description:
      "Basic concepts of computer science, programming fundamentals, and problem-solving techniques.",
    longDescription:
      "This course provides an introduction to computer science as a discipline. Students will learn fundamental programming concepts using a high-level programming language, basic algorithms, data structures, and problem-solving methodologies. The course emphasizes computational thinking and includes hands-on programming exercises.",
    prerequisites: [],
    instructor: "Dr. Sarah Smith",
    instructorEmail: "sarah.smith@university.edu",
    maxCapacity: 30,
    currentEnrollment: 25,
    status: "active",
    schedule: {
      fall: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "9:00 AM - 10:00 AM",
        location: "CS Building - Room 101",
      },
      spring: {
        days: ["Tuesday", "Thursday"],
        time: "10:00 AM - 11:30 AM",
        location: "CS Building - Room 102",
      },
    },
    tags: ["programming", "fundamentals", "beginner"],
    objectives: [
      "Understand basic programming concepts",
      "Develop problem-solving skills",
      "Learn fundamental data structures",
      "Practice algorithmic thinking",
    ],
    requirements: [
      "Basic mathematics skills",
      "No prior programming experience required",
    ],
    textbooks: [
      {
        title: "Introduction to Computer Science",
        author: "John Doe",
        isbn: "978-0123456789",
        required: true,
      },
    ],
    assessments: [
      { type: "Assignments", weight: 40 },
      { type: "Midterm Exam", weight: 25 },
      { type: "Final Exam", weight: 35 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "cs201",
    courseCode: "CS 201",
    courseName: "Data Structures and Algorithms",
    credits: 4,
    department: "Computer Science",
    level: "undergraduate",
    courseLevel: 200,
    description:
      "Study of fundamental data structures and algorithms, with emphasis on implementation and analysis.",
    longDescription:
      "This course covers fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs. Students will learn algorithm design and analysis techniques, including time and space complexity analysis. The course includes extensive programming assignments to implement and use these data structures.",
    prerequisites: ["CS 101"],
    instructor: "Dr. Michael Johnson",
    instructorEmail: "michael.johnson@university.edu",
    maxCapacity: 25,
    currentEnrollment: 22,
    status: "active",
    schedule: {
      fall: {
        days: ["Tuesday", "Thursday"],
        time: "2:00 PM - 4:00 PM",
        location: "CS Building - Room 201",
      },
      spring: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "11:00 AM - 12:00 PM",
        location: "CS Building - Room 203",
      },
    },
    tags: ["algorithms", "data structures", "intermediate"],
    objectives: [
      "Master fundamental data structures",
      "Analyze algorithm complexity",
      "Implement efficient algorithms",
      "Choose appropriate data structures for problems",
    ],
    requirements: [
      "Completion of CS 101",
      "Strong programming skills",
      "Basic discrete mathematics knowledge",
    ],
    textbooks: [
      {
        title: "Data Structures and Algorithms",
        author: "Jane Smith",
        isbn: "978-0987654321",
        required: true,
      },
    ],
    assessments: [
      { type: "Programming Projects", weight: 50 },
      { type: "Quizzes", weight: 20 },
      { type: "Final Exam", weight: 30 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "math201",
    courseCode: "MATH 201",
    courseName: "Calculus I",
    credits: 4,
    department: "Mathematics",
    level: "undergraduate",
    courseLevel: 200,
    description:
      "Differential and integral calculus of functions of one variable with applications.",
    longDescription:
      "This course provides a rigorous introduction to differential and integral calculus. Topics include limits, continuity, derivatives, applications of derivatives, integrals, and the Fundamental Theorem of Calculus. Students will solve real-world problems using calculus techniques.",
    prerequisites: ["MATH 120"],
    instructor: "Prof. Emily Davis",
    instructorEmail: "emily.davis@university.edu",
    maxCapacity: 40,
    currentEnrollment: 35,
    status: "active",
    schedule: {
      fall: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "10:00 AM - 11:30 AM",
        location: "Math Building - Room 150",
      },
      spring: {
        days: ["Tuesday", "Thursday"],
        time: "1:00 PM - 2:30 PM",
        location: "Math Building - Room 155",
      },
    },
    tags: ["calculus", "mathematics", "foundational"],
    objectives: [
      "Master differential calculus concepts",
      "Apply derivatives to solve problems",
      "Understand integral calculus",
      "Connect theory with applications",
    ],
    requirements: [
      "Strong algebra and trigonometry background",
      "Completion of precalculus",
    ],
    textbooks: [
      {
        title: "Calculus: Early Transcendentals",
        author: "James Stewart",
        isbn: "978-1285741550",
        required: true,
      },
    ],
    assessments: [
      { type: "Homework", weight: 20 },
      { type: "Midterm Exams", weight: 40 },
      { type: "Final Exam", weight: 40 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "phys101",
    courseCode: "PHYS 101",
    courseName: "General Physics I",
    credits: 3,
    department: "Physics",
    level: "undergraduate",
    courseLevel: 100,
    description:
      "Mechanics, heat, and thermodynamics with laboratory component.",
    longDescription:
      "This course covers classical mechanics including kinematics, dynamics, energy, momentum, rotational motion, oscillations, and waves. Students will also study thermodynamics and heat transfer. Laboratory sessions provide hands-on experience with physics experiments.",
    prerequisites: ["MATH 120"],
    corequisites: ["PHYS 101L"],
    instructor: "Dr. Robert Wilson",
    instructorEmail: "robert.wilson@university.edu",
    maxCapacity: 35,
    currentEnrollment: 30,
    status: "active",
    schedule: {
      fall: {
        days: ["Tuesday", "Thursday"],
        time: "1:00 PM - 2:30 PM",
        location: "Physics Building - Room 101",
      },
    },
    tags: ["physics", "mechanics", "laboratory"],
    objectives: [
      "Understand classical mechanics principles",
      "Apply physics concepts to real problems",
      "Develop experimental skills",
      "Use mathematical tools in physics",
    ],
    requirements: [
      "Concurrent enrollment in Physics 101L",
      "Calculus I recommended",
    ],
    textbooks: [
      {
        title: "University Physics",
        author: "Hugh Young",
        isbn: "978-0321973610",
        required: true,
      },
    ],
    assessments: [
      { type: "Laboratory Reports", weight: 25 },
      { type: "Midterm Exams", weight: 35 },
      { type: "Final Exam", weight: 40 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "eng101",
    courseCode: "ENG 101",
    courseName: "English Composition",
    credits: 3,
    department: "English",
    level: "undergraduate",
    courseLevel: 100,
    description:
      "Writing skills development and composition techniques for academic and professional communication.",
    longDescription:
      "This course focuses on developing effective writing skills for academic and professional contexts. Students will learn to organize ideas clearly, develop arguments, conduct research, and cite sources properly. Emphasis is placed on the writing process, including drafting, revising, and editing.",
    prerequisites: [],
    instructor: "Prof. Lisa Brown",
    instructorEmail: "lisa.brown@university.edu",
    maxCapacity: 25,
    currentEnrollment: 20,
    status: "active",
    schedule: {
      fall: {
        days: ["Monday", "Wednesday"],
        time: "2:00 PM - 3:30 PM",
        location: "Liberal Arts - Room 205",
      },
      spring: {
        days: ["Tuesday", "Thursday"],
        time: "9:00 AM - 10:30 AM",
        location: "Liberal Arts - Room 210",
      },
    },
    tags: ["writing", "composition", "communication"],
    objectives: [
      "Develop clear and effective writing",
      "Master academic writing conventions",
      "Learn research and citation skills",
      "Practice critical thinking through writing",
    ],
    requirements: [
      "High school English background",
      "Placement test may be required",
    ],
    textbooks: [
      {
        title: "The Bedford Handbook",
        author: "Diana Hacker",
        isbn: "978-1319058678",
        required: true,
      },
    ],
    assessments: [
      { type: "Essays", weight: 60 },
      { type: "Class Participation", weight: 20 },
      { type: "Final Portfolio", weight: 20 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "cs401",
    courseCode: "CS 401",
    courseName: "Software Engineering",
    credits: 4,
    department: "Computer Science",
    level: "undergraduate",
    courseLevel: 400,
    description:
      "Software development methodologies, project management, and team-based software projects.",
    longDescription:
      "This capstone course covers software engineering principles and practices. Students work in teams to complete a substantial software project using industry-standard tools and methodologies. Topics include requirements analysis, system design, testing, version control, and project management.",
    prerequisites: ["CS 201", "CS 301"],
    instructor: "Dr. Jennifer Lee",
    instructorEmail: "jennifer.lee@university.edu",
    maxCapacity: 20,
    currentEnrollment: 18,
    status: "active",
    schedule: {
      spring: {
        days: ["Monday", "Wednesday"],
        time: "3:00 PM - 5:00 PM",
        location: "CS Building - Room 301",
      },
    },
    tags: ["software engineering", "project management", "senior"],
    objectives: [
      "Apply software engineering principles",
      "Work effectively in development teams",
      "Manage large software projects",
      "Use professional development tools",
    ],
    requirements: [
      "Senior standing in Computer Science",
      "Completion of core CS curriculum",
    ],
    textbooks: [
      {
        title: "Software Engineering: A Practitioner's Approach",
        author: "Roger Pressman",
        isbn: "978-0073523682",
        required: true,
      },
    ],
    assessments: [
      { type: "Team Project", weight: 70 },
      { type: "Individual Assignments", weight: 20 },
      { type: "Presentation", weight: 10 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "bio101",
    courseCode: "BIO 101",
    courseName: "General Biology",
    credits: 4,
    department: "Biology",
    level: "undergraduate",
    courseLevel: 100,
    description:
      "Introduction to biological principles including cell structure, genetics, evolution, and ecology.",
    longDescription:
      "This course provides a comprehensive introduction to biology, covering fundamental concepts in cell biology, genetics, evolution, and ecology. Laboratory sessions complement lectures with hands-on experiments and observations. Students will develop scientific thinking and laboratory skills.",
    prerequisites: ["CHEM 101"],
    corequisites: ["BIO 101L"],
    instructor: "Dr. Maria Garcia",
    instructorEmail: "maria.garcia@university.edu",
    maxCapacity: 24,
    currentEnrollment: 22,
    status: "active",
    schedule: {
      spring: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "1:00 PM - 3:00 PM",
        location: "Science Building - Room 120",
      },
    },
    tags: ["biology", "life sciences", "laboratory"],
    objectives: [
      "Understand fundamental biological principles",
      "Develop laboratory and research skills",
      "Apply scientific method",
      "Connect biology to everyday life",
    ],
    requirements: [
      "Chemistry 101 with grade C or better",
      "Concurrent enrollment in Biology 101L",
    ],
    textbooks: [
      {
        title: "Campbell Biology",
        author: "Neil Campbell",
        isbn: "978-0134093413",
        required: true,
      },
    ],
    assessments: [
      { type: "Laboratory Reports", weight: 30 },
      { type: "Midterm Exams", weight: 35 },
      { type: "Final Exam", weight: 35 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "hist201",
    courseCode: "HIST 201",
    courseName: "World History I",
    credits: 3,
    department: "History",
    level: "undergraduate",
    courseLevel: 200,
    description:
      "Survey of world history from ancient civilizations to 1500 CE.",
    longDescription:
      "This course examines major developments in world history from the emergence of early civilizations through the late medieval period. Students will analyze social, political, economic, and cultural changes across different regions and time periods, developing critical thinking skills and historical perspective.",
    prerequisites: [],
    instructor: "Dr. James Taylor",
    instructorEmail: "james.taylor@university.edu",
    maxCapacity: 30,
    currentEnrollment: 25,
    status: "active",
    schedule: {
      fall: {
        days: ["Tuesday", "Thursday"],
        time: "11:00 AM - 12:30 PM",
        location: "Liberal Arts - Room 301",
      },
    },
    tags: ["history", "world civilizations", "humanities"],
    objectives: [
      "Understand major historical developments",
      "Analyze historical sources and evidence",
      "Develop critical thinking skills",
      "Appreciate cultural diversity",
    ],
    requirements: ["College-level reading and writing skills"],
    textbooks: [
      {
        title: "World History: Patterns of Interaction",
        author: "McDougal Littell",
        isbn: "978-0618409914",
        required: true,
      },
    ],
    assessments: [
      { type: "Research Papers", weight: 40 },
      { type: "Midterm Exam", weight: 25 },
      { type: "Final Exam", weight: 35 },
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
];

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatalogCourses: builder.query<
      CatalogCourse[],
      {
        search?: string;
        department?: string;
        level?: "all" | "undergraduate" | "graduate";
        courseLevel?: string;
        credits?: string;
        status?: "all" | "active" | "inactive";
      }
    >({
      queryFn: async (filters = {}) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filteredCourses = [...mockCatalogCourses];

        // Apply filters
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredCourses = filteredCourses.filter(
            (course) =>
              course.courseName.toLowerCase().includes(searchLower) ||
              course.courseCode.toLowerCase().includes(searchLower) ||
              course.description.toLowerCase().includes(searchLower) ||
              course.instructor.toLowerCase().includes(searchLower) ||
              course.tags.some((tag) => tag.toLowerCase().includes(searchLower))
          );
        }

        if (filters.department && filters.department !== "all") {
          filteredCourses = filteredCourses.filter(
            (course) => course.department === filters.department
          );
        }

        if (filters.level && filters.level !== "all") {
          filteredCourses = filteredCourses.filter(
            (course) => course.level === filters.level
          );
        }

        if (filters.courseLevel && filters.courseLevel !== "all") {
          const levelNum = parseInt(filters.courseLevel);
          filteredCourses = filteredCourses.filter(
            (course) => Math.floor(course.courseLevel / 100) * 100 === levelNum
          );
        }

        if (filters.credits && filters.credits !== "all") {
          if (filters.credits === "5+") {
            filteredCourses = filteredCourses.filter(
              (course) => course.credits >= 5
            );
          } else {
            const creditNum = parseInt(filters.credits);
            filteredCourses = filteredCourses.filter(
              (course) => course.credits === creditNum
            );
          }
        }

        if (filters.status && filters.status !== "all") {
          filteredCourses = filteredCourses.filter(
            (course) => course.status === filters.status
          );
        }

        return { data: filteredCourses };
      },
      providesTags: ["Course"],
    }),

    getCourseById: builder.query<CatalogCourse, string>({
      queryFn: async (courseId) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        const course = mockCatalogCourses.find((c) => c.id === courseId);

        if (!course) {
          return {
            error: { status: 404, data: { message: "Course not found" } },
          };
        }

        return { data: course };
      },
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    getCatalogStats: builder.query<CatalogStats, void>({
      queryFn: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 200));

        const totalCourses = mockCatalogCourses.length;
        const activeCourses = mockCatalogCourses.filter(
          (c) => c.status === "active"
        ).length;

        const departmentCounts = mockCatalogCourses.reduce((acc, course) => {
          acc[course.department] = (acc[course.department] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const levelCounts = mockCatalogCourses.reduce((acc, course) => {
          acc[course.level] = (acc[course.level] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const creditDistribution = mockCatalogCourses.reduce((acc, course) => {
          const key = course.credits >= 5 ? "5+" : course.credits.toString();
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return {
          data: {
            totalCourses,
            activeCourses,
            departmentCounts,
            levelCounts,
            creditDistribution,
          },
        };
      },
      providesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCatalogCoursesQuery,
  useGetCourseByIdQuery,
  useGetCatalogStatsQuery,
} = catalogApi;

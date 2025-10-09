// Assignment-related types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  dueDate: string;
  submissionType: "file" | "text" | "url" | "quiz";
  maxPoints: number;
  status: "draft" | "published" | "archived";
  instructions?: string;
  resources?: {
    id: string;
    name: string;
    url: string;
    type: "pdf" | "doc" | "video" | "link";
  }[];
  rubric?: {
    criteria: string;
    points: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Student assignment with submission details
export interface StudentAssignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  dueDate: string;
  submissionType: "file" | "text" | "url" | "quiz";
  maxPoints: number;
  status: "PENDING" | "SUBMITTED" | "GRADED" | "OVERDUE" | "DRAFT";
  priority: "HIGH" | "MEDIUM" | "LOW";
  category: string;
  submission?: {
    id: string;
    submittedAt: string;
    submissionText?: string;
    files?: {
      name: string;
      url: string;
      size: number;
    }[];
    url?: string;
    status: "SUBMITTED" | "LATE" | "ON_TIME";
  };
  grade?: {
    score: number;
    maxScore: number;
    letterGrade: string;
    feedback?: string;
    gradedAt: string;
    gradedBy: string;
  };
  timeRemaining?: string;
  progress: number;
  estimatedTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

// Mock student assignments data
const mockStudentAssignmentsData: StudentAssignment[] = [
  {
    id: "1",
    title: "Binary Search Algorithm Implementation",
    description:
      "Implement and analyze the binary search algorithm with time complexity analysis",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    instructor: "Dr. Sarah Johnson",
    dueDate: "2025-10-15T23:59:00Z",
    submissionType: "file",
    maxPoints: 100,
    status: "PENDING",
    priority: "HIGH",
    category: "Programming",
    progress: 45,
    estimatedTime: "4-6 hours",
    difficulty: "Medium",
    timeRemaining: "6 days",
    tags: ["Algorithm", "Python", "Analysis"],
  },
  {
    id: "2",
    title: "Integration by Parts Problem Set",
    description:
      "Complete problems 1-15 from Chapter 7, showing all work and steps",
    courseId: "2",
    courseName: "Calculus II",
    courseCode: "MATH201",
    instructor: "Prof. Michael Chen",
    dueDate: "2025-10-12T23:59:00Z",
    submissionType: "file",
    maxPoints: 50,
    status: "OVERDUE",
    priority: "HIGH",
    category: "Problem Set",
    progress: 30,
    estimatedTime: "2-3 hours",
    difficulty: "Hard",
    timeRemaining: "3 days overdue",
    tags: ["Calculus", "Integration", "Mathematics"],
  },
  {
    id: "3",
    title: "Research Paper Draft",
    description:
      "Submit first draft of your research paper on chosen literary analysis topic",
    courseId: "3",
    courseName: "Academic Writing",
    courseCode: "ENG102",
    instructor: "Dr. Emily Rodriguez",
    dueDate: "2025-10-20T23:59:00Z",
    submissionType: "text",
    maxPoints: 150,
    status: "SUBMITTED",
    priority: "MEDIUM",
    category: "Research Paper",
    submission: {
      id: "sub_3",
      submittedAt: "2025-10-18T14:30:00Z",
      submissionText: "The Role of Technology in Modern Literature...",
      status: "ON_TIME",
    },
    progress: 100,
    estimatedTime: "8-10 hours",
    difficulty: "Hard",
    tags: ["Writing", "Research", "Literature"],
  },
  {
    id: "4",
    title: "Ancient Civilizations Essay",
    description:
      "Write a 2000-word essay comparing ancient Greek and Roman political systems",
    courseId: "4",
    courseName: "World History I",
    courseCode: "HIST105",
    instructor: "Prof. David Thompson",
    dueDate: "2025-10-18T23:59:00Z",
    submissionType: "file",
    maxPoints: 100,
    status: "GRADED",
    priority: "MEDIUM",
    category: "Essay",
    submission: {
      id: "sub_4",
      submittedAt: "2025-10-17T20:45:00Z",
      files: [
        {
          name: "ancient_civilizations_essay.pdf",
          url: "/files/assignments/ancient_civilizations_essay.pdf",
          size: 245760,
        },
      ],
      status: "ON_TIME",
    },
    grade: {
      score: 88,
      maxScore: 100,
      letterGrade: "B+",
      feedback:
        "Excellent analysis of political structures. Could improve on economic comparisons.",
      gradedAt: "2025-10-19T10:15:00Z",
      gradedBy: "Prof. David Thompson",
    },
    progress: 100,
    estimatedTime: "6-8 hours",
    difficulty: "Medium",
    tags: ["History", "Essay", "Ancient Civilizations"],
  },
  {
    id: "5",
    title: "Lab Report: Cell Division",
    description:
      "Complete lab report on mitosis and meiosis observation experiments",
    courseId: "5",
    courseName: "General Biology",
    courseCode: "BIO110",
    instructor: "Dr. Lisa Park",
    dueDate: "2025-05-15T23:59:00Z",
    submissionType: "file",
    maxPoints: 75,
    status: "GRADED",
    priority: "LOW",
    category: "Lab Report",
    submission: {
      id: "sub_5",
      submittedAt: "2025-05-14T16:20:00Z",
      files: [
        {
          name: "cell_division_lab_report.pdf",
          url: "/files/assignments/cell_division_lab_report.pdf",
          size: 189440,
        },
      ],
      status: "ON_TIME",
    },
    grade: {
      score: 72,
      maxScore: 75,
      letterGrade: "A-",
      feedback:
        "Thorough observations and accurate diagrams. Minor issues with data analysis.",
      gradedAt: "2025-05-20T09:30:00Z",
      gradedBy: "Dr. Lisa Park",
    },
    progress: 100,
    estimatedTime: "3-4 hours",
    difficulty: "Easy",
    tags: ["Biology", "Lab", "Cell Biology"],
  },
  {
    id: "6",
    title: "Physics Problem Set #3",
    description:
      "Solve problems related to Newton's laws of motion and force calculations",
    courseId: "6",
    courseName: "Physics I",
    courseCode: "PHYS201",
    instructor: "Prof. Robert Kim",
    dueDate: "2025-08-20T23:59:00Z",
    submissionType: "file",
    maxPoints: 60,
    status: "DRAFT",
    priority: "LOW",
    category: "Problem Set",
    progress: 0,
    estimatedTime: "2-3 hours",
    difficulty: "Medium",
    tags: ["Physics", "Mechanics", "Problem Solving"],
  },
  {
    id: "7",
    title: "Web Development Project",
    description:
      "Build a responsive website using HTML, CSS, and JavaScript with modern design principles",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    instructor: "Dr. Sarah Johnson",
    dueDate: "2025-10-25T23:59:00Z",
    submissionType: "url",
    maxPoints: 200,
    status: "PENDING",
    priority: "HIGH",
    category: "Project",
    progress: 20,
    estimatedTime: "12-15 hours",
    difficulty: "Hard",
    timeRemaining: "16 days",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "8",
    title: "Literature Review",
    description:
      "Comprehensive review of recent academic papers on your chosen research topic",
    courseId: "3",
    courseName: "Academic Writing",
    courseCode: "ENG102",
    instructor: "Dr. Emily Rodriguez",
    dueDate: "2025-11-01T23:59:00Z",
    submissionType: "text",
    maxPoints: 100,
    status: "PENDING",
    priority: "MEDIUM",
    category: "Research",
    progress: 10,
    estimatedTime: "8-10 hours",
    difficulty: "Hard",
    timeRemaining: "23 days",
    tags: ["Research", "Literature", "Academic Writing"],
  },
];

// Mock API hook for student assignments
export function useGetStudentAssignmentsQuery(params: {
  page: number;
  limit: number;
  status?: string;
}) {
  const isLoading = false;
  const isError = false;
  const error = null;

  const { page, limit, status } = params;

  // Filter by status if provided
  let filteredAssignments = mockStudentAssignmentsData;
  if (status && status !== "all") {
    filteredAssignments = mockStudentAssignmentsData.filter(
      (assignment) => assignment.status.toLowerCase() === status.toLowerCase()
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedAssignments = filteredAssignments.slice(startIndex, endIndex);

  const data = {
    data: {
      assignments: paginatedAssignments,
      pagination: {
        page,
        limit,
        total: filteredAssignments.length,
        totalPages: Math.ceil(filteredAssignments.length / limit),
      },
    },
  };

  return {
    data,
    isLoading,
    isError,
    error,
  };
}

// Get assignment statistics
export function useGetAssignmentStatsQuery() {
  const isLoading = false;
  const isError = false;
  const error = null;

  const stats = {
    total: mockStudentAssignmentsData.length,
    pending: mockStudentAssignmentsData.filter((a) => a.status === "PENDING")
      .length,
    submitted: mockStudentAssignmentsData.filter(
      (a) => a.status === "SUBMITTED"
    ).length,
    graded: mockStudentAssignmentsData.filter((a) => a.status === "GRADED")
      .length,
    overdue: mockStudentAssignmentsData.filter((a) => a.status === "OVERDUE")
      .length,
    averageGrade:
      mockStudentAssignmentsData
        .filter((a) => a.grade)
        .reduce(
          (sum, a) => sum + (a.grade!.score / a.grade!.maxScore) * 100,
          0
        ) / mockStudentAssignmentsData.filter((a) => a.grade).length,
  };

  return {
    data: { data: stats },
    isLoading,
    isError,
    error,
  };
}

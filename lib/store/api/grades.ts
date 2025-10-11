import { CourseGrade } from "@/constants/table-columns/grades";

// Mock grades data for current academic year
const mockGradesData: CourseGrade[] = [
  {
    id: "1",
    courseId: "cs101",
    courseCode: "CS 3340",
    courseName: "Web Development Fundamentals",
    instructor: "Prof. Alex Thompson",
    credits: 3,
    currentGrade: {
      letterGrade: "A-",
      percentage: 91.5,
      points: 366,
      maxPoints: 400,
    },
    gradingPeriod: "Fall 2025",
    status: "IN_PROGRESS",
    lastUpdated: "2025-10-10T10:30:00Z",
    assignments: {
      completed: 8,
      total: 12,
      averageScore: 89.3,
    },
    examScores: {
      midterm: 94,
    },
    attendance: {
      present: 28,
      total: 30,
      percentage: 93.3,
    },
  },
  {
    id: "2",
    courseId: "eng102",
    courseCode: "ENG 102",
    courseName: "Academic Writing",
    instructor: "Dr. Emily Rodriguez",
    credits: 3,
    currentGrade: {
      letterGrade: "B+",
      percentage: 87.2,
      points: 349,
      maxPoints: 400,
    },
    gradingPeriod: "Fall 2025",
    status: "IN_PROGRESS",
    lastUpdated: "2025-10-08T14:15:00Z",
    assignments: {
      completed: 6,
      total: 10,
      averageScore: 85.7,
    },
    examScores: {
      midterm: 89,
    },
    attendance: {
      present: 25,
      total: 28,
      percentage: 89.3,
    },
  },
  {
    id: "3",
    courseId: "math201",
    courseCode: "MATH 201",
    courseName: "Calculus II",
    instructor: "Dr. Michael Chen",
    credits: 4,
    currentGrade: {
      letterGrade: "B",
      percentage: 82.8,
      points: 331,
      maxPoints: 400,
    },
    gradingPeriod: "Fall 2025",
    status: "IN_PROGRESS",
    lastUpdated: "2025-10-09T16:45:00Z",
    assignments: {
      completed: 7,
      total: 10,
      averageScore: 79.8,
    },
    examScores: {
      midterm: 85,
    },
    attendance: {
      present: 32,
      total: 35,
      percentage: 91.4,
    },
  },
  {
    id: "4",
    courseId: "hist105",
    courseCode: "HIST 105",
    courseName: "World History I",
    instructor: "Prof. David Thompson",
    credits: 3,
    gradingPeriod: "Fall 2025",
    status: "NOT_GRADED",
    lastUpdated: "2025-10-05T09:20:00Z",
    assignments: {
      completed: 3,
      total: 8,
      averageScore: 92.0,
    },
    attendance: {
      present: 20,
      total: 22,
      percentage: 90.9,
    },
  },
  {
    id: "5",
    courseId: "bio110",
    courseCode: "BIO 110",
    courseName: "General Biology",
    instructor: "Dr. Lisa Park",
    credits: 4,
    currentGrade: {
      letterGrade: "A",
      percentage: 95.3,
      points: 477,
      maxPoints: 500,
    },
    gradingPeriod: "Spring 2025",
    status: "COMPLETED",
    lastUpdated: "2025-05-15T11:30:00Z",
    assignments: {
      completed: 12,
      total: 12,
      averageScore: 94.2,
    },
    examScores: {
      midterm: 96,
      final: 94,
    },
    attendance: {
      present: 42,
      total: 45,
      percentage: 93.3,
    },
  },
  {
    id: "6",
    courseId: "cs201",
    courseCode: "CS 201",
    courseName: "Data Structures & Algorithms",
    instructor: "Prof. Sarah Johnson",
    credits: 4,
    currentGrade: {
      letterGrade: "A",
      percentage: 93.7,
      points: 468,
      maxPoints: 500,
    },
    gradingPeriod: "Spring 2025",
    status: "COMPLETED",
    lastUpdated: "2025-05-18T15:45:00Z",
    assignments: {
      completed: 10,
      total: 10,
      averageScore: 91.8,
    },
    examScores: {
      midterm: 92,
      final: 95,
    },
    attendance: {
      present: 40,
      total: 42,
      percentage: 95.2,
    },
  },
  {
    id: "7",
    courseId: "phys101",
    courseCode: "PHYS 101",
    courseName: "General Physics I",
    instructor: "Dr. Robert Kim",
    credits: 4,
    currentGrade: {
      letterGrade: "C+",
      percentage: 78.5,
      points: 314,
      maxPoints: 400,
    },
    gradingPeriod: "Fall 2025",
    status: "IN_PROGRESS",
    lastUpdated: "2025-10-07T13:20:00Z",
    assignments: {
      completed: 5,
      total: 9,
      averageScore: 75.4,
    },
    examScores: {
      midterm: 81,
    },
    attendance: {
      present: 26,
      total: 30,
      percentage: 86.7,
    },
  },
  {
    id: "8",
    courseId: "chem101",
    courseCode: "CHEM 101",
    courseName: "General Chemistry",
    instructor: "Dr. Amanda Wilson",
    credits: 4,
    gradingPeriod: "Fall 2025",
    status: "PENDING",
    lastUpdated: "2025-10-01T08:00:00Z",
    assignments: {
      completed: 2,
      total: 10,
      averageScore: 88.5,
    },
    attendance: {
      present: 15,
      total: 18,
      percentage: 83.3,
    },
  },
];

// Helper function to convert letter grade to points
function getGradePoints(letterGrade: string): number {
  switch (letterGrade) {
    case "A+":
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.3;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.3;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.3;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0.0;
  }
}

// Mock API hook for student grades
export function useGetStudentGradesQuery(params: {
  page: number;
  limit: number;
  semester?: string;
  year?: number;
  status?: string;
}) {
  // Filter grades based on parameters
  let filteredGrades = mockGradesData;

  if (params.semester || params.year) {
    filteredGrades = filteredGrades.filter((grade) => {
      const [semester, year] = grade.gradingPeriod.split(" ");
      if (params.semester && semester !== params.semester) return false;
      if (params.year && parseInt(year) !== params.year) return false;
      return true;
    });
  }

  if (params.status) {
    filteredGrades = filteredGrades.filter(
      (grade) => grade.status === params.status
    );
  }

  // Calculate pagination
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const paginatedGrades = filteredGrades.slice(startIndex, endIndex);

  // Calculate GPA
  const gradedCourses = filteredGrades.filter((grade) => grade.currentGrade);
  const totalPoints = gradedCourses.reduce((sum, grade) => {
    if (!grade.currentGrade) return sum;
    const gradePoints = getGradePoints(grade.currentGrade.letterGrade);
    return sum + gradePoints * grade.credits;
  }, 0);
  const totalCredits = gradedCourses.reduce(
    (sum, grade) => sum + grade.credits,
    0
  );
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {
    data: {
      success: true,
      data: {
        grades: paginatedGrades,
        totalCredits: filteredGrades.reduce(
          (sum, grade) => sum + grade.credits,
          0
        ),
        gpa: parseFloat(gpa.toFixed(2)),
        gradingPeriod: "Fall 2025",
      },
    },
    isLoading: false,
    isError: false,
    error: null,
  };
}

// Get grade statistics
export function useGetGradeStatsQuery() {
  const gradedCourses = mockGradesData.filter((grade) => grade.currentGrade);

  // Calculate grade distribution
  const gradeDistribution = gradedCourses.reduce(
    (acc, grade) => {
      if (!grade.currentGrade) return acc;
      const letter = grade.currentGrade.letterGrade.charAt(0);
      if (letter in acc) {
        acc[letter as keyof typeof acc]++;
      }
      return acc;
    },
    { A: 0, B: 0, C: 0, D: 0, F: 0 }
  );

  // Calculate current GPA
  const totalPoints = gradedCourses.reduce((sum, grade) => {
    if (!grade.currentGrade) return sum;
    const gradePoints = getGradePoints(grade.currentGrade.letterGrade);
    return sum + gradePoints * grade.credits;
  }, 0);
  const totalCredits = gradedCourses.reduce(
    (sum, grade) => sum + grade.credits,
    0
  );
  const currentGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {
    data: {
      success: true,
      data: {
        currentGPA: parseFloat(currentGPA.toFixed(2)),
        creditHours: totalCredits,
        gradeDistribution,
        trendData: [
          { semester: "Spring 2024", gpa: 3.2 },
          { semester: "Fall 2024", gpa: 3.4 },
          { semester: "Spring 2025", gpa: 3.6 },
          { semester: "Fall 2025", gpa: currentGPA },
        ],
      },
    },
    isLoading: false,
    isError: false,
    error: null,
  };
}

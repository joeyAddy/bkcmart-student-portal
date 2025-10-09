// Course materials related types
export interface CourseMaterial {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  type:
    | "PDF"
    | "DOC"
    | "VIDEO"
    | "LINK"
    | "PRESENTATION"
    | "AUDIO"
    | "EBOOK"
    | "ASSIGNMENT";
  category:
    | "Textbook"
    | "Lecture Notes"
    | "Reading"
    | "Video Lecture"
    | "Supplementary"
    | "Assignment"
    | "Reference";
  fileUrl?: string;
  externalUrl?: string;
  fileSize?: number; // in bytes
  uploadDate: string;
  lastAccessed?: string;
  downloadCount: number;
  isRequired: boolean;
  isPublic: boolean;
  tags: string[];
  semester: string;
  year: number;
}

// Mock course materials data
const mockCourseMaterialsData: CourseMaterial[] = [
  {
    id: "1",
    title: "Introduction to Computer Science - Textbook",
    description:
      "Primary textbook covering fundamental programming concepts and data structures",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    instructor: "Dr. Sarah Johnson",
    type: "EBOOK",
    category: "Textbook",
    fileUrl: "/materials/cs101-textbook.pdf",
    fileSize: 15728640, // 15MB
    uploadDate: "2025-08-15T00:00:00Z",
    lastAccessed: "2025-10-08T14:30:00Z",
    downloadCount: 156,
    isRequired: true,
    isPublic: false,
    tags: ["Programming", "Computer Science", "Fundamentals"],
    semester: "Fall",
    year: 2025,
  },
  {
    id: "2",
    title: "Week 5 Lecture: Binary Search Trees",
    description:
      "Video lecture covering binary search tree implementation and analysis",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    instructor: "Dr. Sarah Johnson",
    type: "VIDEO",
    category: "Video Lecture",
    externalUrl: "https://campus.edu/videos/cs101-week5",
    uploadDate: "2025-09-20T10:00:00Z",
    lastAccessed: "2025-10-07T16:45:00Z",
    downloadCount: 89,
    isRequired: true,
    isPublic: false,
    tags: ["Data Structures", "Algorithms", "Trees"],
    semester: "Fall",
    year: 2025,
  },
  {
    id: "3",
    title: "Calculus II Formula Sheet",
    description: "Comprehensive formula reference for integration techniques",
    courseId: "2",
    courseName: "Calculus II",
    courseCode: "MATH201",
    instructor: "Prof. Michael Chen",
    type: "PDF",
    category: "Reference",
    fileUrl: "/materials/calculus2-formulas.pdf",
    fileSize: 524288, // 512KB
    uploadDate: "2025-08-20T00:00:00Z",
    lastAccessed: "2025-10-09T09:15:00Z",
    downloadCount: 234,
    isRequired: false,
    isPublic: true,
    tags: ["Calculus", "Formulas", "Reference"],
    semester: "Fall",
    year: 2025,
  },
  {
    id: "4",
    title: "Academic Writing Style Guide",
    description: "MLA and APA formatting guidelines with examples",
    courseId: "3",
    courseName: "Academic Writing",
    courseCode: "ENG102",
    instructor: "Dr. Emily Rodriguez",
    type: "DOC",
    category: "Reference",
    fileUrl: "/materials/writing-style-guide.docx",
    fileSize: 1048576, // 1MB
    uploadDate: "2025-08-25T00:00:00Z",
    lastAccessed: "2025-10-05T11:20:00Z",
    downloadCount: 178,
    isRequired: true,
    isPublic: false,
    tags: ["Writing", "MLA", "APA", "Citations"],
    semester: "Fall",
    year: 2025,
  },
  {
    id: "5",
    title: "Week 3 Lecture Slides: Research Methods",
    description:
      "PowerPoint presentation on qualitative and quantitative research approaches",
    courseId: "3",
    courseName: "Academic Writing",
    courseCode: "ENG102",
    instructor: "Dr. Emily Rodriguez",
    type: "PRESENTATION",
    category: "Lecture Notes",
    fileUrl: "/materials/research-methods-slides.pptx",
    fileSize: 2097152, // 2MB
    uploadDate: "2025-09-10T00:00:00Z",
    lastAccessed: "2025-10-08T13:45:00Z",
    downloadCount: 145,
    isRequired: true,
    isPublic: false,
    tags: ["Research", "Methodology", "Presentation"],
    semester: "Fall",
    year: 2025,
  },
  {
    id: "6",
    title: "World History Timeline - Interactive",
    description:
      "Interactive timeline covering major historical events and civilizations",
    courseId: "4",
    courseName: "World History I",
    courseCode: "HIST105",
    instructor: "Prof. David Thompson",
    type: "LINK",
    category: "Supplementary",
    externalUrl: "https://timeline.worldhistory.edu/interactive",
    uploadDate: "2025-08-30T00:00:00Z",
    lastAccessed: "2025-10-06T15:30:00Z",
    downloadCount: 203,
    isRequired: false,
    isPublic: true,
    tags: ["History", "Timeline", "Interactive"],
    semester: "Fall",
    year: 2025,
  },
  {
    id: "7",
    title: "Biology Lab Manual",
    description:
      "Complete laboratory procedures and safety guidelines for all experiments",
    courseId: "5",
    courseName: "General Biology",
    courseCode: "BIO110",
    instructor: "Dr. Lisa Park",
    type: "PDF",
    category: "Textbook",
    fileUrl: "/materials/biology-lab-manual.pdf",
    fileSize: 8388608, // 8MB
    uploadDate: "2025-01-15T00:00:00Z",
    lastAccessed: "2025-05-10T08:45:00Z",
    downloadCount: 267,
    isRequired: true,
    isPublic: false,
    tags: ["Biology", "Laboratory", "Procedures"],
    semester: "Spring",
    year: 2025,
  },
  {
    id: "8",
    title: "Cell Biology Audio Lectures",
    description:
      "Series of audio recordings explaining cellular processes and structures",
    courseId: "5",
    courseName: "General Biology",
    courseCode: "BIO110",
    instructor: "Dr. Lisa Park",
    type: "AUDIO",
    category: "Video Lecture",
    fileUrl: "/materials/cell-biology-audio.mp3",
    fileSize: 52428800, // 50MB
    uploadDate: "2025-02-20T00:00:00Z",
    lastAccessed: "2025-05-08T19:15:00Z",
    downloadCount: 134,
    isRequired: false,
    isPublic: false,
    tags: ["Biology", "Audio", "Cells"],
    semester: "Spring",
    year: 2025,
  },
  {
    id: "9",
    title: "Physics Problem Solutions",
    description:
      "Detailed solutions to textbook problems with step-by-step explanations",
    courseId: "6",
    courseName: "Physics I",
    courseCode: "PHYS201",
    instructor: "Prof. Robert Kim",
    type: "PDF",
    category: "Supplementary",
    fileUrl: "/materials/physics-solutions.pdf",
    fileSize: 3145728, // 3MB
    uploadDate: "2025-08-18T00:00:00Z",
    lastAccessed: "2025-08-25T12:30:00Z",
    downloadCount: 45,
    isRequired: false,
    isPublic: false,
    tags: ["Physics", "Solutions", "Problems"],
    semester: "Fall",
    year: 2025,
  },
  {
    id: "10",
    title: "Programming Assignment Template",
    description: "Starter code template for the final programming project",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    instructor: "Dr. Sarah Johnson",
    type: "PDF",
    category: "Assignment",
    fileUrl: "/materials/programming-template.zip",
    fileSize: 262144, // 256KB
    uploadDate: "2025-10-01T00:00:00Z",
    lastAccessed: "2025-10-09T10:20:00Z",
    downloadCount: 67,
    isRequired: true,
    isPublic: false,
    tags: ["Programming", "Template", "Project"],
    semester: "Fall",
    year: 2025,
  },
];

// Mock API hook for course materials
export function useGetCourseMaterialsQuery(params: {
  page: number;
  limit: number;
  type?: string;
}) {
  const isLoading = false;
  const isError = false;
  const error = null;

  const { page, limit, type } = params;

  // Filter by type if provided
  let filteredMaterials = mockCourseMaterialsData;
  if (type && type !== "all") {
    filteredMaterials = mockCourseMaterialsData.filter(
      (material) => material.type.toLowerCase() === type.toLowerCase()
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex);

  const data = {
    data: {
      materials: paginatedMaterials,
      pagination: {
        page,
        limit,
        total: filteredMaterials.length,
        totalPages: Math.ceil(filteredMaterials.length / limit),
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

// Get materials statistics
export function useGetMaterialStatsQuery() {
  const isLoading = false;
  const isError = false;
  const error = null;

  const stats = {
    total: mockCourseMaterialsData.length,
    pdf: mockCourseMaterialsData.filter((m) => m.type === "PDF").length,
    video: mockCourseMaterialsData.filter((m) => m.type === "VIDEO").length,
    ebook: mockCourseMaterialsData.filter((m) => m.type === "EBOOK").length,
    presentation: mockCourseMaterialsData.filter(
      (m) => m.type === "PRESENTATION"
    ).length,
    required: mockCourseMaterialsData.filter((m) => m.isRequired).length,
    totalDownloads: mockCourseMaterialsData.reduce(
      (sum, m) => sum + m.downloadCount,
      0
    ),
  };

  return {
    data: { data: stats },
    isLoading,
    isError,
    error,
  };
}

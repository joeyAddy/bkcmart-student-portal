// Discussion forum related types
export interface DiscussionCategory {
  id: string;
  name: string;
  description: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  threadCount: number;
  postCount: number;
  lastActivity?: string;
  isActive: boolean;
}

export interface DiscussionThread {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  lastActivity: string;
  isPinned: boolean;
  isLocked: boolean;
  isResolved: boolean;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  tags: string[];
  postCount: number;
  viewCount: number;
  participantCount: number;
  hasUnreadPosts: boolean;
  lastPost?: {
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  };
}

export interface DiscussionPost {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: "STUDENT" | "INSTRUCTOR" | "TA" | "ADMIN";
  content: string;
  createdAt: string;
  updatedAt?: string;
  isEdited: boolean;
  parentPostId?: string; // for replies
  reactions: {
    like: number;
    helpful: number;
    question: number;
  };
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  isMarkedAsAnswer: boolean;
  isFromInstructor: boolean;
}

// Mock discussion threads data
const mockDiscussionThreadsData: DiscussionThread[] = [
  {
    id: "1",
    title: "Forum 1",
    description: "IFB012 Pemrograman Berorientasi Objek",
    categoryId: "ifb012",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    authorId: "instructor1",
    authorName: "Dr. Sarah Johnson",
    createdAt: "2023-12-12T08:00:00Z",
    lastActivity: "2023-12-20T09:00:00Z",
    isPinned: true,
    isLocked: false,
    isResolved: false,
    priority: "HIGH",
    tags: ["General", "Announcements"],
    postCount: 12,
    viewCount: 245,
    participantCount: 24,
    hasUnreadPosts: true,
    lastPost: {
      id: "post1",
      authorName: "Rini Nirmala, M.Klin",
      content: "hayo ebenerin duu, jangan 'buru² dikumpulkan 😊",
      createdAt: "2023-12-20T09:00:00Z",
    },
  },
  {
    id: "2",
    title: "Forum 2",
    description: "Weekly Assignment Discussion",
    categoryId: "ifb012",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    authorId: "student1",
    authorName: "Jovanca Aduhci",
    createdAt: "2023-12-12T10:00:00Z",
    lastActivity: "2023-12-19T15:30:00Z",
    isPinned: false,
    isLocked: false,
    isResolved: true,
    priority: "NORMAL",
    tags: ["Assignment", "Help"],
    postCount: 8,
    viewCount: 156,
    participantCount: 12,
    hasUnreadPosts: false,
    lastPost: {
      id: "post2",
      authorName: "Rini Nirmala, M.Klin",
      content: "okee",
      createdAt: "2023-12-19T15:30:00Z",
    },
  },
  {
    id: "3",
    title: "Forum 3",
    description: "Project Collaboration Space",
    categoryId: "ifb012",
    courseId: "1",
    courseName: "Introduction to Computer Science",
    courseCode: "CS101",
    authorId: "student2",
    authorName: "Jonathan Dual",
    createdAt: "2023-12-12T14:00:00Z",
    lastActivity: "2023-07-21T08:12:00Z",
    isPinned: false,
    isLocked: false,
    isResolved: false,
    priority: "NORMAL",
    tags: ["Project", "Collaboration"],
    postCount: 15,
    viewCount: 298,
    participantCount: 18,
    hasUnreadPosts: true,
    lastPost: {
      id: "post3",
      authorName: "Rakaburning Suhu",
      content: "Bu mau tanya, apa itu SGIP?",
      createdAt: "2023-07-21T08:12:00Z",
    },
  },
  {
    id: "4",
    title: "Calculus II Study Group",
    description: "Integration techniques discussion and problem solving",
    categoryId: "math201",
    courseId: "2",
    courseName: "Calculus II",
    courseCode: "MATH201",
    authorId: "student3",
    authorName: "Alex Chen",
    createdAt: "2025-09-15T00:00:00Z",
    lastActivity: "2025-10-08T16:45:00Z",
    isPinned: false,
    isLocked: false,
    isResolved: false,
    priority: "NORMAL",
    tags: ["Study Group", "Integration"],
    postCount: 23,
    viewCount: 187,
    participantCount: 15,
    hasUnreadPosts: true,
    lastPost: {
      id: "post4",
      authorName: "Prof. Michael Chen",
      content:
        "Great progress everyone! Keep practicing the integration by parts examples.",
      createdAt: "2025-10-08T16:45:00Z",
    },
  },
  {
    id: "5",
    title: "Research Paper Guidelines",
    description: "Questions about MLA formatting and citation requirements",
    categoryId: "eng102",
    courseId: "3",
    courseName: "Academic Writing",
    courseCode: "ENG102",
    authorId: "instructor2",
    authorName: "Dr. Emily Rodriguez",
    createdAt: "2025-09-20T00:00:00Z",
    lastActivity: "2025-10-07T14:20:00Z",
    isPinned: true,
    isLocked: false,
    isResolved: false,
    priority: "HIGH",
    tags: ["Guidelines", "MLA", "Citations"],
    postCount: 18,
    viewCount: 243,
    participantCount: 28,
    hasUnreadPosts: false,
    lastPost: {
      id: "post5",
      authorName: "Sarah Williams",
      content: "Thank you for the clarification on in-text citations!",
      createdAt: "2025-10-07T14:20:00Z",
    },
  },
  {
    id: "6",
    title: "Ancient Civilizations Discussion",
    description: "Comparing Greek and Roman political systems",
    categoryId: "hist105",
    courseId: "4",
    courseName: "World History I",
    courseCode: "HIST105",
    authorId: "student4",
    authorName: "Maria Gonzalez",
    createdAt: "2025-09-25T00:00:00Z",
    lastActivity: "2025-10-06T11:30:00Z",
    isPinned: false,
    isLocked: false,
    isResolved: true,
    priority: "NORMAL",
    tags: ["Ancient History", "Politics", "Comparison"],
    postCount: 14,
    viewCount: 176,
    participantCount: 19,
    hasUnreadPosts: false,
    lastPost: {
      id: "post6",
      authorName: "Prof. David Thompson",
      content: "Excellent insights on the democratic vs republic systems!",
      createdAt: "2025-10-06T11:30:00Z",
    },
  },
  {
    id: "7",
    title: "Lab Safety and Procedures",
    description: "Important safety guidelines for biology experiments",
    categoryId: "bio110",
    courseId: "5",
    courseName: "General Biology",
    courseCode: "BIO110",
    authorId: "instructor3",
    authorName: "Dr. Lisa Park",
    createdAt: "2025-01-20T00:00:00Z",
    lastActivity: "2025-05-12T09:15:00Z",
    isPinned: true,
    isLocked: true,
    isResolved: false,
    priority: "URGENT",
    tags: ["Safety", "Lab", "Procedures"],
    postCount: 5,
    viewCount: 189,
    participantCount: 32,
    hasUnreadPosts: false,
    lastPost: {
      id: "post7",
      authorName: "Dr. Lisa Park",
      content: "Please review all safety protocols before next lab session.",
      createdAt: "2025-05-12T09:15:00Z",
    },
  },
  {
    id: "8",
    title: "Physics Problem Solving Strategies",
    description: "Tips and techniques for solving complex physics problems",
    categoryId: "phys201",
    courseId: "6",
    courseName: "Physics I",
    courseCode: "PHYS201",
    authorId: "student5",
    authorName: "David Kim",
    createdAt: "2025-08-22T00:00:00Z",
    lastActivity: "2025-08-28T13:45:00Z",
    isPinned: false,
    isLocked: false,
    isResolved: false,
    priority: "NORMAL",
    tags: ["Problem Solving", "Physics", "Strategies"],
    postCount: 9,
    viewCount: 98,
    participantCount: 8,
    hasUnreadPosts: true,
    lastPost: {
      id: "post8",
      authorName: "Prof. Robert Kim",
      content: "Try breaking down complex problems into smaller steps first.",
      createdAt: "2025-08-28T13:45:00Z",
    },
  },
];

// Mock API hook for discussion threads
export function useGetDiscussionThreadsQuery(params: {
  page: number;
  limit: number;
  courseId?: string;
}) {
  const isLoading = false;
  const isError = false;
  const error = null;

  const { page, limit, courseId } = params;

  // Filter by course if provided
  let filteredThreads = mockDiscussionThreadsData;
  if (courseId && courseId !== "all") {
    filteredThreads = mockDiscussionThreadsData.filter(
      (thread) => thread.courseId === courseId
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedThreads = filteredThreads.slice(startIndex, endIndex);

  const data = {
    data: {
      threads: paginatedThreads,
      pagination: {
        page,
        limit,
        total: filteredThreads.length,
        totalPages: Math.ceil(filteredThreads.length / limit),
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

// Get discussion statistics
export function useGetDiscussionStatsQuery() {
  const isLoading = false;
  const isError = false;
  const error = null;

  const stats = {
    total: mockDiscussionThreadsData.length,
    cs101: mockDiscussionThreadsData.filter((t) => t.courseCode === "CS101")
      .length,
    math201: mockDiscussionThreadsData.filter((t) => t.courseCode === "MATH201")
      .length,
    eng102: mockDiscussionThreadsData.filter((t) => t.courseCode === "ENG102")
      .length,
    hist105: mockDiscussionThreadsData.filter((t) => t.courseCode === "HIST105")
      .length,
    bio110: mockDiscussionThreadsData.filter((t) => t.courseCode === "BIO110")
      .length,
    unread: mockDiscussionThreadsData.filter((t) => t.hasUnreadPosts).length,
    pinned: mockDiscussionThreadsData.filter((t) => t.isPinned).length,
    totalPosts: mockDiscussionThreadsData.reduce(
      (sum, t) => sum + t.postCount,
      0
    ),
    totalParticipants: mockDiscussionThreadsData.reduce(
      (sum, t) => sum + t.participantCount,
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

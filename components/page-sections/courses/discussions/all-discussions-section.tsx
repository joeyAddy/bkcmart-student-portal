"use client";

import { useState } from "react";
import { ForumSidebar } from "./forum-sidebar";
import { ForumChatArea } from "./forum-chat-area";

interface Forum {
  id: number;
  name: string;
  date: string;
  hasNotification: boolean;
  notificationCount?: number;
  hasGreenDot?: boolean;
  number?: number;
}

interface Course {
  id: string;
  name: string;
  regularCount: number;
  forums: Forum[];
}

interface ForumContent {
  forumTitle: string;
  courseName: string;
  messages: {
    id: string;
    author: string;
    content: string;
    isInstructor?: boolean;
    timestamp: string;
    hasImage?: boolean;
    imageUrl?: string;
    imageAlt?: string;
    replies?: {
      author: string;
      content: string;
      isInstructor?: boolean;
      timestamp: string;
    }[];
  }[];
}

export function AllDiscussionsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState(
    "2022/2023 Odd Semester"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("1");
  const [selectedForum, setSelectedForum] = useState(1);

  // State to manage dynamic messages for each forum
  const [forumMessages, setForumMessages] = useState<{
    [key: string]: ForumContent["messages"];
  }>({});

  const [courses] = useState<Course[]>([
    {
      id: "1",
      name: "Introduction to Computer Science",
      regularCount: 5,
      forums: [
        {
          id: 1,
          name: "General Discussion",
          date: "Oct 15, 2024",
          hasNotification: true,
          notificationCount: 5,
          hasGreenDot: true,
        },
        {
          id: 2,
          name: "Assignment Help",
          date: "Oct 12, 2024",
          hasNotification: true,
          notificationCount: 2,
        },
        {
          id: 3,
          name: "Technical Issues",
          date: "Oct 10, 2024",
          hasNotification: false,
        },
        {
          id: 4,
          name: "Python Programming",
          date: "Oct 8, 2024",
          hasNotification: true,
          notificationCount: 8,
          hasGreenDot: true,
        },
        {
          id: 5,
          name: "Project Showcase",
          date: "Oct 5, 2024",
          hasNotification: false,
        },
      ],
    },
    {
      id: "2",
      name: "Data Structures and Algorithms",
      regularCount: 6,
      forums: [
        {
          id: 6,
          name: "General Discussion",
          date: "Oct 8, 2024",
          hasNotification: true,
          notificationCount: 3,
        },
        {
          id: 7,
          name: "Algorithm Analysis",
          date: "Oct 6, 2024",
          hasNotification: true,
          notificationCount: 7,
          hasGreenDot: true,
        },
        {
          id: 8,
          name: "Implementation Help",
          date: "Oct 5, 2024",
          hasNotification: true,
          notificationCount: 1,
        },
        {
          id: 9,
          name: "Big O Notation",
          date: "Oct 3, 2024",
          hasNotification: false,
        },
        {
          id: 10,
          name: "Tree Structures",
          date: "Sep 30, 2024",
          hasNotification: true,
          notificationCount: 4,
        },
        {
          id: 11,
          name: "Graph Algorithms",
          date: "Sep 28, 2024",
          hasNotification: false,
        },
      ],
    },
    {
      id: "3",
      name: "Database Management Systems",
      regularCount: 4,
      forums: [
        {
          id: 12,
          name: "General Discussion",
          date: "Sep 30, 2024",
          hasNotification: false,
        },
        {
          id: 13,
          name: "SQL Help",
          date: "Sep 28, 2024",
          hasNotification: true,
          notificationCount: 4,
        },
        {
          id: 14,
          name: "Database Design",
          date: "Sep 25, 2024",
          hasNotification: true,
          notificationCount: 6,
          hasGreenDot: true,
        },
        {
          id: 15,
          name: "Performance Optimization",
          date: "Sep 22, 2024",
          hasNotification: false,
        },
      ],
    },
    {
      id: "4",
      name: "Web Development",
      regularCount: 7,
      forums: [
        {
          id: 16,
          name: "General Discussion",
          date: "Oct 12, 2024",
          hasNotification: true,
          notificationCount: 9,
          hasGreenDot: true,
        },
        {
          id: 17,
          name: "Frontend Technologies",
          date: "Oct 10, 2024",
          hasNotification: true,
          notificationCount: 12,
        },
        {
          id: 18,
          name: "Backend Development",
          date: "Oct 8, 2024",
          hasNotification: true,
          notificationCount: 3,
        },
        {
          id: 19,
          name: "JavaScript Help",
          date: "Oct 6, 2024",
          hasNotification: false,
        },
        {
          id: 20,
          name: "CSS & Styling",
          date: "Oct 4, 2024",
          hasNotification: true,
          notificationCount: 2,
        },
        {
          id: 21,
          name: "Project Collaboration",
          date: "Oct 2, 2024",
          hasNotification: false,
        },
        {
          id: 22,
          name: "Deployment & Hosting",
          date: "Sep 30, 2024",
          hasNotification: true,
          notificationCount: 5,
        },
      ],
    },
  ]);

  // Forum content mapping
  const forumContentMap: { [key: string]: ForumContent } = {
    "1-1": {
      // Course 1, Forum 1 - CS General Discussion
      forumTitle: "General Discussion Forum",
      courseName: "Introduction to Computer Science",
      messages: [
        {
          id: "cs-welcome",
          author: "Dr. Sarah Johnson",
          content:
            "Welcome to our General Discussion Forum! This is a space where you can ask questions, share insights, and engage with your classmates about course materials. Please remember to keep discussions relevant and respectful.",
          isInstructor: true,
          timestamp: "2 hours ago",
          replies: [
            {
              author: "Alex Chen",
              content:
                "Thank you, Dr. Johnson! I'm excited to be part of this course.",
              timestamp: "1 hour ago",
            },
            {
              author: "Maria Rodriguez",
              content: "Looking forward to learning with everyone!",
              timestamp: "45 minutes ago",
            },
          ],
        },
        {
          id: "cs-question",
          author: "John Smith",
          content:
            "I have a question about the assignment due next week. Could someone clarify the requirements for the final project proposal?",
          timestamp: "30 minutes ago",
          replies: [
            {
              author: "Dr. Sarah Johnson",
              content:
                "Great question, John! The proposal should include: 1) Problem statement, 2) Proposed solution approach, 3) Timeline, and 4) Expected outcomes. Let me know if you need clarification on any of these points.",
              isInstructor: true,
              timestamp: "15 minutes ago",
            },
          ],
        },
        {
          id: "cs-study-group",
          author: "Emma Thompson",
          content:
            "Has anyone started working on the midterm study guide? I'd love to form a study group if anyone is interested!",
          timestamp: "10 minutes ago",
        },
      ],
    },
    "1-2": {
      // Course 1, Forum 2 - CS Assignment Help
      forumTitle: "Assignment Help Forum",
      courseName: "Introduction to Computer Science",
      messages: [
        {
          id: "assignment-help-1",
          author: "Prof. Michael Davis",
          content:
            "This forum is dedicated to helping you with your assignments. Please be specific about what you're struggling with and show your work so far.",
          isInstructor: true,
          timestamp: "1 day ago",
        },
        {
          id: "assignment-help-2",
          author: "Lisa Park",
          content:
            "I'm having trouble with the recursion assignment. Can someone explain how to approach the factorial function?",
          timestamp: "3 hours ago",
          hasImage: true,
          imageUrl: "/assets/images/logo.jpeg",
          imageAlt: "Code screenshot showing factorial function attempt",
          replies: [
            {
              author: "Prof. Michael Davis",
              content:
                "Good question, Lisa! Remember that recursion has two parts: the base case and the recursive case. For factorial, the base case is when n=0 or n=1, which should return 1.",
              isInstructor: true,
              timestamp: "2 hours ago",
            },
            {
              author: "David Kim",
              content:
                "I can help! Think of it as: factorial(n) = n * factorial(n-1). Just make sure to handle the base case.",
              timestamp: "1 hour ago",
            },
          ],
        },
      ],
    },
    "1-4": {
      // Course 1, Forum 4 - Python Programming
      forumTitle: "Python Programming Forum",
      courseName: "Introduction to Computer Science",
      messages: [
        {
          id: "python-intro",
          author: "Dr. Sarah Johnson",
          content:
            "Welcome to our Python Programming discussion! Share your Python code, ask for help with syntax, and discuss best practices.",
          isInstructor: true,
          timestamp: "5 hours ago",
          hasImage: true,
          imageUrl: "/assets/images/smiley-teacher-classroom.webp",
          imageAlt: "Python programming environment",
        },
        {
          id: "python-question-1",
          author: "Rachel Green",
          content:
            "What's the difference between lists and tuples in Python? When should I use each one?",
          timestamp: "2 hours ago",
          replies: [
            {
              author: "Mike Ross",
              content:
                "Lists are mutable (can be changed) while tuples are immutable (cannot be changed). Use lists when you need to modify the data, tuples when you want to ensure the data stays constant.",
              timestamp: "1 hour ago",
            },
          ],
        },
        {
          id: "python-code-share",
          author: "Tom Wilson",
          content:
            "Here's a useful function I wrote for sorting dictionaries by value. Feel free to use it in your projects!",
          timestamp: "45 minutes ago",
          hasImage: true,
          imageUrl: "/assets/images/logo.jpeg",
          imageAlt: "Python code snippet for dictionary sorting",
        },
      ],
    },
    "2-7": {
      // Course 2, Forum 7 - Algorithm Analysis
      forumTitle: "Algorithm Analysis Forum",
      courseName: "Data Structures and Algorithms",
      messages: [
        {
          id: "algo-welcome",
          author: "Prof. Alan Turing",
          content:
            "This forum is for discussing algorithm complexity, optimization techniques, and performance analysis. Please share your approaches and let's learn together!",
          isInstructor: true,
          timestamp: "1 day ago",
        },
        {
          id: "algo-question-1",
          author: "Grace Hopper",
          content:
            "I'm confused about the time complexity of merge sort. Can someone walk through the analysis?",
          timestamp: "4 hours ago",
          hasImage: true,
          imageUrl: "/assets/images/smiley-teacher-classroom.webp",
          imageAlt: "Merge sort algorithm visualization",
          replies: [
            {
              author: "Prof. Alan Turing",
              content:
                "Great question! Merge sort has O(n log n) time complexity. The 'log n' comes from the number of times we can divide the array in half, and 'n' comes from the merging step at each level.",
              isInstructor: true,
              timestamp: "3 hours ago",
            },
            {
              author: "Donald Knuth",
              content:
                "I found it helpful to draw the recursion tree. Each level has O(n) work, and there are log n levels.",
              timestamp: "2 hours ago",
            },
          ],
        },
      ],
    },
    "3-14": {
      // Course 3, Forum 14 - Database Design
      forumTitle: "Database Design Forum",
      courseName: "Database Management Systems",
      messages: [
        {
          id: "db-design-intro",
          author: "Dr. Edgar Codd",
          content:
            "This forum focuses on database design principles, normalization, and entity-relationship modeling. Share your database schemas and get feedback!",
          isInstructor: true,
          timestamp: "2 days ago",
          hasImage: true,
          imageUrl: "/assets/images/logo.jpeg",
          imageAlt: "Database design diagram example",
        },
        {
          id: "db-normalization",
          author: "Chris Date",
          content:
            "Can someone explain the difference between 2NF and 3NF with a practical example?",
          timestamp: "6 hours ago",
          replies: [
            {
              author: "Dr. Edgar Codd",
              content:
                "2NF eliminates partial dependencies on composite keys, while 3NF eliminates transitive dependencies. I'll post a detailed example in the next class.",
              isInstructor: true,
              timestamp: "4 hours ago",
            },
          ],
        },
        {
          id: "db-er-diagram",
          author: "Peter Chen",
          content:
            "Here's my ER diagram for the library management system project. Any feedback would be appreciated!",
          timestamp: "2 hours ago",
          hasImage: true,
          imageUrl: "/assets/images/smiley-teacher-classroom.webp",
          imageAlt: "Library management system ER diagram",
        },
      ],
    },
    "4-17": {
      // Course 4, Forum 17 - Frontend Technologies
      forumTitle: "Frontend Technologies Forum",
      courseName: "Web Development",
      messages: [
        {
          id: "frontend-intro",
          author: "Prof. Tim Berners-Lee",
          content:
            "Welcome to our Frontend Technologies forum! Discuss React, Vue, Angular, CSS frameworks, and modern frontend development practices.",
          isInstructor: true,
          timestamp: "1 day ago",
        },
        {
          id: "react-hooks",
          author: "Dan Abramov",
          content:
            "What's your favorite React hook and why? I'm curious to hear about your experiences with useState vs useReducer.",
          timestamp: "5 hours ago",
          hasImage: true,
          imageUrl: "/assets/images/logo.jpeg",
          imageAlt: "React hooks comparison chart",
          replies: [
            {
              author: "Sophie Wilson",
              content:
                "I love useEffect for side effects, but I'm still getting the hang of the dependency array.",
              timestamp: "3 hours ago",
            },
            {
              author: "Prof. Tim Berners-Lee",
              content:
                "useReducer is great for complex state logic. Think of it as useState's more powerful cousin!",
              isInstructor: true,
              timestamp: "2 hours ago",
            },
          ],
        },
        {
          id: "css-grid",
          author: "Rachel Andrew",
          content:
            "Just discovered CSS Grid and it's amazing! Here's a layout I created for a responsive dashboard.",
          timestamp: "1 hour ago",
          hasImage: true,
          imageUrl: "/assets/images/smiley-teacher-classroom.webp",
          imageAlt: "CSS Grid layout example",
        },
      ],
    },
    // Additional forum contents for other forums
    "1-3": {
      // Technical Issues
      forumTitle: "Technical Issues Forum",
      courseName: "Introduction to Computer Science",
      messages: [
        {
          id: "tech-support",
          author: "IT Support Team",
          content:
            "Post your technical issues here and our team will help you resolve them. Please include details about your operating system and browser when reporting issues.",
          isInstructor: true,
          timestamp: "1 day ago",
        },
        {
          id: "login-issue",
          author: "Sam Carter",
          content:
            "I'm having trouble logging into the course portal. It keeps saying my credentials are invalid even though I'm sure they're correct.",
          timestamp: "2 hours ago",
          replies: [
            {
              author: "IT Support Team",
              content:
                "Hi Sam, please try clearing your browser cache and cookies. If the issue persists, please email us at support@university.edu with your student ID.",
              isInstructor: true,
              timestamp: "1 hour ago",
            },
          ],
        },
      ],
    },
    "2-6": {
      // DSA General Discussion
      forumTitle: "General Discussion Forum",
      courseName: "Data Structures and Algorithms",
      messages: [
        {
          id: "dsa-welcome",
          author: "Prof. Donald Knuth",
          content:
            "Welcome to Data Structures and Algorithms! This course will challenge you to think algorithmically and understand the trade-offs between different data structures.",
          isInstructor: true,
          timestamp: "3 days ago",
        },
        {
          id: "study-tips",
          author: "Alice Johnson",
          content:
            "Any tips for studying for this course? I'm finding the recursive algorithms particularly challenging.",
          timestamp: "1 day ago",
          replies: [
            {
              author: "Bob Wilson",
              content:
                "Practice drawing out the recursion trees! It really helps visualize what's happening.",
              timestamp: "12 hours ago",
            },
          ],
        },
      ],
    },
    "4-16": {
      // Web Dev General Discussion
      forumTitle: "General Discussion Forum",
      courseName: "Web Development",
      messages: [
        {
          id: "webdev-intro",
          author: "Prof. Tim Berners-Lee",
          content:
            "Welcome to Web Development! We'll be covering HTML, CSS, JavaScript, and modern frameworks. Feel free to share your projects and ask for feedback!",
          isInstructor: true,
          timestamp: "2 days ago",
          hasImage: true,
          imageUrl: "/assets/images/smiley-teacher-classroom.webp",
          imageAlt: "Web development workspace",
        },
        {
          id: "first-website",
          author: "Maya Patel",
          content:
            "Just finished my first responsive website! It's a portfolio site using CSS Grid and Flexbox. So excited to share it with everyone!",
          timestamp: "6 hours ago",
          hasImage: true,
          imageUrl: "/assets/images/logo.jpeg",
          imageAlt: "Portfolio website screenshot",
          replies: [
            {
              author: "Prof. Tim Berners-Lee",
              content:
                "Congratulations Maya! Portfolio sites are a great way to showcase your skills. Remember to test it on different devices and browsers.",
              isInstructor: true,
              timestamp: "4 hours ago",
            },
          ],
        },
      ],
    },
  };

  const selectForum = (courseId: string, forumId: number) => {
    console.log("Selecting forum:", forumId, "from course:", courseId);
    setSelectedCourse(courseId);
    setSelectedForum(forumId);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const forumKey = `${selectedCourse}-${selectedForum}`;
    const newMessage = {
      id: `msg-${Date.now()}`,
      author: "You", // In a real app, this would be the current user's name
      content: message.trim(),
      timestamp: new Date().toLocaleString(),
      isInstructor: false,
    };

    setForumMessages((prev) => {
      // If this is the first dynamic message for this forum, initialize with static messages
      if (!prev[forumKey]) {
        const staticContent = forumContentMap[forumKey];
        const initialMessages = staticContent ? staticContent.messages : [];
        return {
          ...prev,
          [forumKey]: [...initialMessages, newMessage],
        };
      }

      // Otherwise, just add to existing messages
      return {
        ...prev,
        [forumKey]: [...prev[forumKey], newMessage],
      };
    });

    console.log("Message sent to forum:", message);
  };

  const handleSendReply = (message: string, parentMessageId: string) => {
    if (!message.trim()) return;

    const forumKey = `${selectedCourse}-${selectedForum}`;
    const newReply = {
      author: "You",
      content: message.trim(),
      timestamp: new Date().toLocaleString(),
      isInstructor: false,
    };

    setForumMessages((prev) => {
      // Initialize with static messages if this forum hasn't been used yet
      let currentMessages = prev[forumKey];
      if (!currentMessages) {
        const staticContent = forumContentMap[forumKey];
        currentMessages = staticContent ? staticContent.messages : [];
      }

      const updatedMessages = currentMessages.map((msg) => {
        if (msg.id === parentMessageId) {
          return {
            ...msg,
            replies: [...(msg.replies || []), newReply],
          };
        }
        return msg;
      });

      return {
        ...prev,
        [forumKey]: updatedMessages,
      };
    });

    console.log("Reply sent to message:", parentMessageId, message);
  };

  // Get current forum content
  const getCurrentForumContent = (): ForumContent => {
    const key = `${selectedCourse}-${selectedForum}`;
    console.log("Looking for content with key:", key);
    console.log("Available keys:", Object.keys(forumContentMap));

    const staticContent = forumContentMap[key] || {
      forumTitle: "General Discussion Forum",
      courseName:
        courses.find((c) => c.id === selectedCourse)?.name || "Unknown Course",
      messages: [
        {
          id: "default",
          author: "System",
          content:
            "Welcome to this forum! Start a discussion by posting a message.",
          timestamp: "Now",
          isInstructor: true,
        },
      ],
    };

    // Get dynamic messages for this forum, or use static messages if no dynamic ones exist
    const dynamicMessages = forumMessages[key];
    const allMessages = dynamicMessages || staticContent.messages;

    return {
      ...staticContent,
      messages: allMessages,
    };
  };

  const currentContent = getCurrentForumContent();

  return (
    <div className="flex h-full bg-card rounded-lg">
      {/* Left Sidebar */}
      <ForumSidebar
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        courses={courses}
        onForumSelect={selectForum}
      />

      {/* Main Chat Area */}
      <ForumChatArea
        forumTitle={currentContent.forumTitle}
        courseName={currentContent.courseName}
        messages={currentContent.messages}
        onSendMessage={handleSendMessage}
        onSendReply={handleSendReply}
      />
    </div>
  );
}

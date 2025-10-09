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

export function AllDiscussionsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [searchQuery, setSearchQuery] = useState("");
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
      ],
    },
    {
      id: "2",
      name: "Data Structures and Algorithms",
      regularCount: 4,
      forums: [
        {
          id: 4,
          name: "General Discussion",
          date: "Oct 8, 2024",
          hasNotification: true,
          notificationCount: 3,
        },
        {
          id: 5,
          name: "Project Discussion",
          date: "Oct 5, 2024",
          hasNotification: true,
          notificationCount: 1,
        },
      ],
    },
    {
      id: "3",
      name: "Database Management Systems",
      regularCount: 4,
      forums: [
        {
          id: 6,
          name: "General Discussion",
          date: "Sep 30, 2024",
          hasNotification: false,
        },
        {
          id: 7,
          name: "SQL Help",
          date: "Sep 28, 2024",
          hasNotification: true,
          notificationCount: 4,
        },
      ],
    },
  ]);

  const selectForum = (courseId: string, forumId: number) => {
    // Handle forum selection - could update state to show active forum
    console.log("Selected forum:", forumId, "from course:", courseId);
  };

  const handleSendMessage = (message: string) => {
    // Handle sending new message to forum
    console.log("Sending message to forum:", message);
  };

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
        forumTitle="General Discussion Forum"
        courseName="Introduction to Computer Science"
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

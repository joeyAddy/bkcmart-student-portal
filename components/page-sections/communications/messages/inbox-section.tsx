"use client";

import { useState } from "react";
import { MessagingSidebar, ChatArea } from "@/components/shared/messaging";

interface Student {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  hasNotification?: boolean;
  notificationCount?: number;
  isOnline?: boolean;
}

interface MessageData {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies?: {
    author: string;
    content: string;
    timestamp: string;
  }[];
}

interface ConversationData {
  studentName: string;
  isOnline: boolean;
  messages: MessageData[];
}

export function InboxSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | undefined>(
    "student-1"
  );

  // Mock data for students
  const students: Student[] = [
    {
      id: "student-1",
      name: "Alice Johnson",
      lastMessage: "Thanks for sharing the notes!",
      timestamp: "2 min ago",
      hasNotification: true,
      notificationCount: 2,
      isOnline: true,
    },
    {
      id: "student-2",
      name: "Bob Smith",
      lastMessage: "Are you free for study group tomorrow?",
      timestamp: "1 hour ago",
      isOnline: false,
    },
    {
      id: "student-3",
      name: "Carol Davis",
      lastMessage: "The assignment deadline is next week",
      timestamp: "3 hours ago",
      hasNotification: true,
      notificationCount: 1,
      isOnline: true,
    },
    {
      id: "student-4",
      name: "David Wilson",
      lastMessage: "Can you help me with the math problem?",
      timestamp: "1 day ago",
      isOnline: false,
    },
    {
      id: "student-5",
      name: "Emma Brown",
      lastMessage: "Great presentation today!",
      timestamp: "2 days ago",
      isOnline: true,
    },
  ];

  // Mock conversation data
  const conversations: Record<string, ConversationData> = {
    "student-1": {
      studentName: "Alice Johnson",
      isOnline: true,
      messages: [
        {
          id: "msg-1",
          author: "Alice Johnson",
          content: "Hey! Did you finish the chemistry assignment?",
          timestamp: "10:30 AM",
        },
        {
          id: "msg-2",
          author: "You",
          content:
            "Almost done! Just working on the last few problems. How about you?",
          timestamp: "10:32 AM",
        },
        {
          id: "msg-3",
          author: "Alice Johnson",
          content:
            "I'm stuck on question 5. Could you share your notes from yesterday's lecture?",
          timestamp: "10:35 AM",
        },
        {
          id: "msg-4",
          author: "You",
          content:
            "Sure! Let me send them over. The professor explained the molecular structure really well.",
          timestamp: "10:37 AM",
        },
        {
          id: "msg-5",
          author: "Alice Johnson",
          content:
            "Thanks for sharing the notes! This really helps clarify the concept.",
          timestamp: "10:45 AM",
        },
      ],
    },
    "student-2": {
      studentName: "Bob Smith",
      isOnline: false,
      messages: [
        {
          id: "msg-1",
          author: "Bob Smith",
          content: "Hey, are you free for study group tomorrow?",
          timestamp: "Yesterday 3:20 PM",
        },
        {
          id: "msg-2",
          author: "You",
          content: "Yes, what time works for you?",
          timestamp: "Yesterday 3:25 PM",
        },
        {
          id: "msg-3",
          author: "Bob Smith",
          content: "How about 2 PM at the library?",
          timestamp: "Yesterday 3:30 PM",
        },
      ],
    },
    "student-3": {
      studentName: "Carol Davis",
      isOnline: true,
      messages: [
        {
          id: "msg-1",
          author: "Carol Davis",
          content: "Just a reminder that the assignment deadline is next week!",
          timestamp: "Today 2:15 PM",
        },
        {
          id: "msg-2",
          author: "Carol Davis",
          content: "We should probably start working on it this weekend.",
          timestamp: "Today 2:16 PM",
        },
      ],
    },
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // TODO: Implement message sending functionality
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = selectedStudent
    ? conversations[selectedStudent]
    : null;

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white overflow-hidden">
      {/* Sidebar */}
      <MessagingSidebar
        conversations={filteredStudents}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onConversationSelect={handleStudentSelect}
        selectedConversation={selectedStudent}
        title="Students"
        searchPlaceholder="Search students..."
      />

      {/* Chat Area */}
      <div className="flex-1">
        {currentConversation ? (
          <ChatArea
            conversationName={currentConversation.studentName}
            isOnline={currentConversation.isOnline}
            messages={currentConversation.messages}
            onSendMessage={handleSendMessage}
            messagePlaceholder="Type a message to your classmate..."
            showActions={true}
            highlightColor="green"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a student from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

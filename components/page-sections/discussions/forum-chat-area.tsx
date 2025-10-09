"use client";

import { ForumHeader } from "./forum-header";
import { WarningNotice } from "./warning-notice";
import { ForumMessage } from "./forum-message";
import { ReplyMessage } from "./reply-message";
import { MessageInput } from "./message-input";
import { Button } from "@/components/ui/button";
import { MoreVertical, Reply } from "lucide-react";
import { useState } from "react";

interface ChatAreaProps {
  forumTitle?: string;
  courseName?: string;
  onSendMessage?: (message: string) => void;
}

export function ForumChatArea({
  forumTitle = "General Discussion Forum",
  courseName = "Introduction to Computer Science",
  onSendMessage,
}: ChatAreaProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReply = (messageId: string) => {
    setReplyingTo(replyingTo === messageId ? null : messageId);
  };

  const handleSendReply = (message: string) => {
    if (onSendMessage) {
      onSendMessage(message);
    }
    setReplyingTo(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-card">
      {/* Header */}
      <ForumHeader
        forumTitle={forumTitle}
        courseTitle={courseName}
        startDate="Oct 15, 2024"
        endDate="Nov 15, 2024"
      />

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-card">
        {/* Warning Notice */}
        <WarningNotice message="Please maintain academic integrity and respectful communication in all discussions." />

        {/* Messages */}
        <div className="space-y-6">
          {/* Instructor Message */}
          <ForumMessage
            id="instructor-welcome"
            author="Dr. Sarah Johnson"
            content="Welcome to our General Discussion Forum! This is a space where you can ask questions, share insights, and engage with your classmates about course materials. Please remember to keep discussions relevant and respectful."
            isInstructor={true}
            timestamp="2 hours ago"
            hasReplies={true}
            replyCount={2}
          >
            <div className="mt-4 space-y-3">
              <ReplyMessage
                author="Alex Chen"
                content="Thank you, Dr. Johnson! I'm excited to be part of this course."
                timestamp="1 hour ago"
              />
              <ReplyMessage
                author="Maria Rodriguez"
                content="Looking forward to learning with everyone!"
                timestamp="45 minutes ago"
              />
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReply("instructor-welcome")}
                className="text-gray-500 hover:text-gray-700"
              >
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {replyingTo === "instructor-welcome" && (
              <div className="mt-3">
                <MessageInput
                  placeholder="Reply to Dr. Sarah Johnson..."
                  onSend={handleSendReply}
                />
              </div>
            )}
          </ForumMessage>

          {/* Student Message */}
          <ForumMessage
            id="john-question"
            author="John Smith"
            content="I have a question about the assignment due next week. Could someone clarify the requirements for the final project proposal?"
            timestamp="30 minutes ago"
            hasReplies={true}
            replyCount={1}
          >
            <div className="mt-4 space-y-3">
              <ReplyMessage
                author="Dr. Sarah Johnson"
                content="Great question, John! The proposal should include: 1) Problem statement, 2) Proposed solution approach, 3) Timeline, and 4) Expected outcomes. Let me know if you need clarification on any of these points."
                isInstructor={true}
                timestamp="15 minutes ago"
              />
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReply("john-question")}
                className="text-gray-500 hover:text-gray-700"
              >
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {replyingTo === "john-question" && (
              <div className="mt-3">
                <MessageInput
                  placeholder="Reply to John Smith..."
                  onSend={handleSendReply}
                />
              </div>
            )}
          </ForumMessage>

          {/* Another Student Message */}
          <ForumMessage
            id="emma-study-group"
            author="Emma Thompson"
            content="Has anyone started working on the midterm study guide? I'd love to form a study group if anyone is interested!"
            timestamp="10 minutes ago"
            hasReplies={false}
            replyCount={0}
          >
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReply("emma-study-group")}
                className="text-gray-500 hover:text-gray-700"
              >
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {replyingTo === "emma-study-group" && (
              <div className="mt-3">
                <MessageInput
                  placeholder="Reply to Emma Thompson..."
                  onSend={handleSendReply}
                />
              </div>
            )}
          </ForumMessage>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t border-gray-200 p-6 bg-card">
        <MessageInput
          placeholder="Type your message to the forum..."
          onSend={onSendMessage}
        />
      </div>
    </div>
  );
}

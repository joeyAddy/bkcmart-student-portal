"use client";

import { ForumHeader } from "./forum-header";
import { WarningNotice } from "./warning-notice";
import { ForumMessage } from "./forum-message";
import { ReplyMessage } from "./reply-message";
import { MessageInput } from "./message-input";
import { ImageViewer } from "@/components/shared/image-viewer";
import { Button } from "@/components/ui/button";
import { MoreVertical, Reply } from "lucide-react";
import { useState } from "react";

interface MessageData {
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
}

interface ChatAreaProps {
  forumTitle?: string;
  courseName?: string;
  messages?: MessageData[];
  onSendMessage?: (message: string) => void;
}

export function ForumChatArea({
  forumTitle = "General Discussion Forum",
  courseName = "Introduction to Computer Science",
  messages = [],
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
          {messages.map((message) => (
            <ForumMessage
              key={message.id}
              id={message.id}
              author={message.author}
              content={message.content}
              isInstructor={message.isInstructor}
              timestamp={message.timestamp}
              hasReplies={message.replies && message.replies.length > 0}
              replyCount={message.replies?.length || 0}
            >
              {/* Image if present */}
              {message.hasImage && message.imageUrl && (
                <div className="mt-3 mb-4">
                  <ImageViewer
                    src={message.imageUrl}
                    alt={message.imageAlt || "Forum image"}
                    width={400}
                    height={200}
                    className="max-w-full h-auto"
                  />
                </div>
              )}

              {/* Replies */}
              {message.replies && message.replies.length > 0 && (
                <div className="mt-4 space-y-3">
                  {message.replies.map((reply, index) => (
                    <ReplyMessage
                      key={`${message.id}-reply-${index}`}
                      author={reply.author}
                      content={reply.content}
                      isInstructor={reply.isInstructor}
                      timestamp={reply.timestamp}
                    />
                  ))}
                </div>
              )}

              {/* Reply actions */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReply(message.id)}
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

              {/* Reply input */}
              {replyingTo === message.id && (
                <div className="mt-3">
                  <MessageInput
                    placeholder={`Reply to ${message.author}...`}
                    onSend={handleSendReply}
                  />
                </div>
              )}
            </ForumMessage>
          ))}
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

"use client";

import { Message } from "./message";
import { MessageInput } from "./message-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, Phone, Video } from "lucide-react";

interface MessageData {
  id: string;
  author: string;
  content: string;
  isHighlighted?: boolean;
  timestamp: string;
  replies?: {
    author: string;
    content: string;
    isHighlighted?: boolean;
    timestamp: string;
  }[];
}

interface ChatAreaProps {
  conversationName: string;
  isOnline?: boolean;
  messages: MessageData[];
  onSendMessage: (message: string) => void;
  messagePlaceholder?: string;
  showActions?: boolean;
  highlightColor?: "blue" | "green" | "purple";
}

export function ChatArea({
  conversationName,
  isOnline = false,
  messages,
  onSendMessage,
  messagePlaceholder = "Type your message...",
  showActions = false,
  highlightColor = "blue",
}: ChatAreaProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{getInitials(conversationName)}</AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{conversationName}</h3>
              <p className="text-sm text-muted-foreground">
                {isOnline ? "Online" : "Last seen recently"}
              </p>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            author={message.author}
            content={message.content}
            isHighlighted={message.isHighlighted}
            timestamp={message.timestamp}
            highlightColor={highlightColor}
          >
            {message.replies && message.replies.length > 0 && (
              <div className="space-y-3">
                {message.replies.map((reply, index) => (
                  <Message
                    key={`${message.id}-reply-${index}`}
                    id={`${message.id}-reply-${index}`}
                    author={reply.author}
                    content={reply.content}
                    isHighlighted={reply.isHighlighted}
                    timestamp={reply.timestamp}
                    highlightColor={highlightColor}
                  />
                ))}
              </div>
            )}
          </Message>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <MessageInput placeholder={messagePlaceholder} onSend={onSendMessage} />
      </div>
    </div>
  );
}

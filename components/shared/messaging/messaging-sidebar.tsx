"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  hasNotification?: boolean;
  notificationCount?: number;
  isOnline?: boolean;
  avatar?: string;
}

interface MessagingSidebarProps {
  conversations: Conversation[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onConversationSelect: (conversationId: string) => void;
  selectedConversation?: string;
  title?: string;
  searchPlaceholder?: string;
}

export function MessagingSidebar({
  conversations,
  searchQuery,
  onSearchChange,
  onConversationSelect,
  selectedConversation,
  title = "Messages",
  searchPlaceholder = "Search conversations...",
}: MessagingSidebarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  return (
    <Card className="w-80 flex flex-col">
      <CardHeader className="pb-3">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-y-auto">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className={`w-full justify-start rounded-none px-4 py-3 h-auto text-left hover:bg-gray-100 ${
                selectedConversation === conversation.id ? "bg-gray-100" : ""
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {getInitials(conversation.name)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">
                      {conversation.name}
                    </h3>
                    {conversation.timestamp && (
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {conversation.timestamp}
                      </span>
                    )}
                  </div>

                  {conversation.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  )}
                </div>

                {conversation.hasNotification &&
                  conversation.notificationCount && (
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                      {conversation.notificationCount}
                    </Badge>
                  )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

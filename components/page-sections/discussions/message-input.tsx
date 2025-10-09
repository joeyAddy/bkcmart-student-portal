"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

interface MessageInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({
  placeholder = "Type your message...",
  onSend,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-3 bg-card">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[80px]"
      />

      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
          disabled={disabled}
        >
          <Paperclip className="h-4 w-4 mr-1" />
          Attach
        </Button>

        <Button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Send className="h-4 w-4 mr-1" />
          Send
        </Button>
      </div>
    </div>
  );
}

import { Message } from "@/components/shared/messaging";

interface ForumMessageProps {
  id: string;
  author: string;
  content: string;
  isInstructor?: boolean;
  timestamp?: string;
  hasReplies?: boolean;
  replyCount?: number;
  children?: React.ReactNode; // For nested replies
}

export function ForumMessage({
  id,
  author,
  content,
  isInstructor = false,
  timestamp,
  hasReplies = false,
  replyCount = 0,
  children,
}: ForumMessageProps) {
  return (
    <Message
      id={id}
      author={author}
      content={content}
      isHighlighted={isInstructor}
      timestamp={timestamp}
      hasReplies={hasReplies}
      replyCount={replyCount}
      highlightColor="blue"
    >
      {children}
    </Message>
  );
}

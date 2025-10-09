"use client";

interface WarningNoticeProps {
  message: string;
}

export function WarningNotice({ message }: WarningNoticeProps) {
  return (
    <div className="px-4 pt-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
        <div className="w-5 h-5 bg-yellow-400 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
        <p className="text-sm text-yellow-800">{message}</p>
      </div>
    </div>
  );
}

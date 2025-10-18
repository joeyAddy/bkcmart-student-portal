"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface ProfilePhotoCardProps {
  currentPhotoUrl?: string;
  userName?: string;
  onPhotoChange?: (file: File) => void;
  onPhotoDelete?: () => void;
}

export function ProfilePhotoCard({
  currentPhotoUrl,
  userName = "User",
  onPhotoChange,
  onPhotoDelete,
}: ProfilePhotoCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    currentPhotoUrl
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoChange?.(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDelete = () => {
    setPreviewUrl(undefined);
    onPhotoDelete?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        {/* Avatar Display */}
        <Avatar className="h-24 w-24 border-2 border-border">
          <AvatarImage src={previewUrl} alt={userName} />
          <AvatarFallback className="text-lg font-semibold">{initials}</AvatarFallback>
        </Avatar>

        {/* Photo Actions */}
        <div className="space-y-2">
          <div className="font-medium text-sm">Edit Your Photo</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Update
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={!previewUrl}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />

        <div className="space-y-2">
          <div className="flex justify-center">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-primary hover:underline font-medium"
            >
              Click to Upload
            </button>
            <span className="text-muted-foreground"> or drag and drop</span>
          </div>
          <div className="text-xs text-muted-foreground">
            JPG or PNG
            <br />
            (Max 450 x 450 px)
          </div>
        </div>
      </div>
    </div>
  );
}

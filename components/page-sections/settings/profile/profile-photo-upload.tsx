"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

export function ProfilePhotoUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: Upload to server
      console.log("File selected:", file);
    }
  };

  const handleDelete = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // TODO: Delete from server
  };

  const handleUpdate = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex justify-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={previewUrl || undefined} alt="Profile photo" />
          <AvatarFallback className="text-2xl">JD</AvatarFallback>
        </Avatar>
      </div>

      {/* Edit Photo Actions */}
      <div className="text-center">
        <h4 className="font-medium mb-2">Edit Your Photo</h4>
        <div className="flex items-center justify-center gap-3 text-sm">
          <button
            onClick={handleDelete}
            className="text-destructive hover:underline"
            type="button"
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            className="text-primary hover:underline"
            type="button"
          >
            Update
          </button>
        </div>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-3">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-primary hover:underline font-medium"
              type="button"
            >
              Click to Upload
            </button>{" "}
            <span className="text-muted-foreground">or drag and drop</span>
          </p>
          <p className="text-xs text-muted-foreground">
            JPG or PNG
            <br />
            (Max 450 x 450 px)
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}

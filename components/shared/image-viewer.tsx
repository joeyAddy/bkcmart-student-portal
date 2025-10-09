"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageViewer({
  src,
  alt,
  width = 400,
  height = 200,
  className = "",
}: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard controls for closing
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail Image - Clickable */}
      <div
        className={`cursor-pointer ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg border border-gray-200"
        />
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">{alt}</DialogTitle>

          {/* Close button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="bg-white/80 text-gray-800 hover:bg-white rounded-full p-2"
              title="Close (Esc)"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Image container - Full screen centered */}
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";

// Cloudinary Video Player types
interface CloudinaryPlayer {
  source: (publicId: string, sourceConfig?: Record<string, unknown>) => void;
  dispose: () => void;
}

export interface CloudinaryVideoPlayerProps {
  videoUrl: string;
  cloudName?: string;
  className?: string;
  controls?: boolean;
  fluid?: boolean;
  playsinline?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  id?: string;
}

export function CloudinaryVideoPlayer({
  videoUrl,
  cloudName = "demo", // Default to demo, replace with your actual cloud name
  className = "relative aspect-video bg-black dark:bg-card rounded-lg overflow-hidden",
  controls = true,
  fluid = true,
  playsinline = true,
  muted = false,
  autoplay = false,
  id = `cloudinary-player-${Math.random().toString(36).substr(2, 9)}`,
}: CloudinaryVideoPlayerProps) {
  const cloudinaryRef = useRef<typeof cloudinary | null>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const videoPlayerRef = useRef<CloudinaryPlayer | null>(null);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = cloudinary;

    // Add a small delay to ensure the DOM element is fully ready
    const initializePlayer = () => {
      if (playerRef.current && playerRef.current.id) {
        try {
          // Initialize Cloudinary Video Player
          const player = cloudinaryRef.current!.videoPlayer(
            playerRef.current.id,
            {
              cloud_name: cloudName,
              secure: true,
              controls,
              fluid,
              playsinline,
              muted,
              autoplay,
            }
          ) as CloudinaryPlayer;

          videoPlayerRef.current = player;

          // Set the video source - for S3 URLs, use the URL directly
          player.source(videoUrl);
        } catch (error) {
          console.error("Failed to initialize Cloudinary Video Player:", error);
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(initializePlayer);

    return () => {
      if (videoPlayerRef.current) {
        try {
          videoPlayerRef.current.dispose();
        } catch (error) {
          console.error("Error disposing video player:", error);
        }
        videoPlayerRef.current = null;
      }
    };
  }, [videoUrl, cloudName, controls, fluid, playsinline, muted, autoplay]);

  return (
    <div className={className}>
      <video
        ref={playerRef}
        id={id}
        className="cld-video-player cld-fluid w-full h-full"
      />
    </div>
  );
}

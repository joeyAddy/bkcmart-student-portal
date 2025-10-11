export interface RecordedClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  recordedDate: string;
  duration: number;
  type: "lecture" | "workshop" | "lab";
  participants: number;
  views: number;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  downloadUrl?: string;
  tags: string[];
  quality: "HD" | "FHD" | "4K";
  fileSize: string;
}

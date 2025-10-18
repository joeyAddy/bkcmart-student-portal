"use client";

import { useState } from "react";
import { AnnouncementHeader } from "./announcement-header";
import { AnnouncementCard } from "./announcement-card";
import { FeaturedAnnouncement } from "./featured-announcement";
import { AnnouncementPagination } from "./announcement-pagination";

interface Announcement {
  id: string;
  title: string;
  author: string;
  authorRole?: string;
  date: string;
  viewCount: number;
  content: string;
  image?: string;
  isFeatured?: boolean;
}

export function AnnouncementsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<string>("announcement-1");

  // Mock announcements data
  const announcements: Announcement[] = [
    {
      id: "announcement-1",
      title: "Welcome Back to School!",
      author: "Principal Linda Carter",
      authorRole: "Principal",
      date: "August 1, 2024",
      viewCount: 1200,
      content:
        "As we embark on another exciting academic year, let's embrace the opportunities that lie ahead. We're thrilled to welcome new faces and reunite with returning students. Don't miss our opening assembly on August 5th!",
      image: "/assets/images/school-welcome.jpg",
      isFeatured: true,
    },
    {
      id: "announcement-2",
      title: "Fall Sports Tryouts Schedule",
      author: "Coach Michael Jordan",
      authorRole: "Coach",
      date: "August 15, 2024",
      viewCount: 850,
      content:
        "Get ready to show your spirit and skills! Tryouts for soccer, volleyball, and football start next week. Check the gym bulletin board for exact dates and required gear. Go Eagles!",
      image: "/assets/images/sports-tryouts.jpg",
    },
    {
      id: "announcement-3",
      title: "Library Hours Extension",
      author: "Librarian Sarah Knox",
      authorRole: "Librarian",
      date: "September 5, 2024",
      viewCount: 600,
      content:
        "Attention students! To support your exam preparation, the library will offer extended hours starting September 15th. Join us for additional study sessions and access thousands of resources!",
      image: "/assets/images/library-extension.jpg",
    },
    {
      id: "announcement-4",
      title: "Flu Vaccination Clinic",
      author: "Nurse Emily White",
      authorRole: "Nurse",
      date: "October 10, 2024",
      viewCount: 300,
      content:
        "Protect yourself this flu season! The school nurse's office will host a vaccination clinic on October 20th. Sign up in the main office. Vaccines are free and available to all students and staff.",
      image: "/assets/images/vaccination-clinic.jpg",
    },
    {
      id: "announcement-5",
      title: "Annual Food Drive Kickoff",
      author: "Head of Student Council Tom Briggs",
      authorRole: "Head of Student Council",
      date: "November 1, 2024",
      viewCount: 400,
      content:
        "Let's make a difference together! Our annual food drive starts November 5th. Please bring non-perishable food items to Room 108. Help us reach our goal to collect over 2,000 pounds of food for local food banks.",
      image: "/assets/images/food-drive.jpg",
    },
  ];

  const totalPages = 12; // As shown in the image

  const featuredAnnouncement =
    announcements.find((a) => a.id === selectedAnnouncement) ||
    announcements[0];

  const regularAnnouncements = announcements.filter(
    (a) => a.id !== selectedAnnouncement
  );

  const filteredAnnouncements = regularAnnouncements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAnnouncementClick = (id: string) => {
    setSelectedAnnouncement(id);
  };

  const handleReadFullPage = () => {
    console.log("Opening full page for:", featuredAnnouncement.title);
    // TODO: Navigate to full announcement page
  };

  const featuredTags = [
    { id: "1", label: "School", color: "blue" },
    { id: "2", label: "Academic", color: "green" },
    { id: "3", label: "Student", color: "yellow" },
  ];

  return (
    <div className="space-y-6">
      {/* Header with search and actions */}
      <AnnouncementHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterClick={() => console.log("Filter clicked")}
      />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              id={announcement.id}
              title={announcement.title}
              author={announcement.author}
              authorRole={announcement.authorRole}
              date={announcement.date}
              viewCount={announcement.viewCount}
              content={announcement.content}
              image={announcement.image}
              onClick={() => handleAnnouncementClick(announcement.id)}
            />
          ))}

          {/* Pagination */}
          <AnnouncementPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Featured Announcement Sidebar */}
        <div className="lg:col-span-1">
          <FeaturedAnnouncement
            title={featuredAnnouncement.title}
            author={featuredAnnouncement.author}
            authorRole={featuredAnnouncement.authorRole}
            date={featuredAnnouncement.date}
            viewCount={featuredAnnouncement.viewCount}
            content={featuredAnnouncement.content}
            image="/assets/images/students-collaboration.jpg" // Placeholder for the collaboration image
            tags={featuredTags}
            onReadFullPage={handleReadFullPage}
          />
        </div>
      </div>
    </div>
  );
}

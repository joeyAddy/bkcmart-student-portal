import {
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardList,
  CreditCard,
  DollarSign,
  Bell,
  Mail,
  TrendingUp,
  Video,
  Award,
} from "lucide-react";
import { NavSection } from "./types";

export const sectionNavigation: NavSection[] = [
  {
    title: "My Dashboard",
    items: [
      {
        title: "Dashboard Overview",
        icon: TrendingUp,
        url: "/dashboard",
        items: [
          { title: "Quick Summary", url: "/dashboard" },
          { title: "Upcoming Deadlines", url: "/dashboard/deadlines" },
        ],
      },
    ],
  },
  {
    title: "My Courses",
    items: [
      {
        title: "Current Courses",
        icon: BookOpen,
        url: "/courses/current",
        items: [
          { title: "All Current Courses", url: "/courses/current" },
          { title: "Course Materials", url: "/courses/materials" },
          { title: "Assignments", url: "/courses/assignments" },
          { title: "Discussion Forums", url: "/courses/discussions" },
        ],
      },
      {
        title: "Course Schedule",
        icon: Calendar,
        url: "/courses/schedule",
        items: [
          { title: "Class Timetable", url: "/courses/schedule" },
          { title: "Exam Schedule", url: "/courses/exams" },
        ],
      },
      {
        title: "Virtual Classroom",
        icon: Video,
        url: "/courses/virtual",
        items: [
          { title: "Live Classes", url: "/courses/virtual/live" },
          { title: "Recorded Lectures", url: "/courses/virtual/recorded" },
          { title: "Study Groups", url: "/courses/virtual/groups" },
        ],
      },
    ],
  },
  {
    title: "Academic Progress",
    items: [
      {
        title: "Grades",
        icon: Award,
        url: "/academics/grades",
        items: [
          { title: "Current Grades", url: "/academics/grades" },
          { title: "Grade History", url: "/academics/grades/history" },
        ],
      },
    ],
  },
  {
    title: "Enrollment",
    items: [
      {
        title: "Course Registration",
        icon: ClipboardList,
        url: "/enrollment/registration",
        items: [
          { title: "Register for Courses", url: "/enrollment/registration" },
          { title: "Course Catalog", url: "/enrollment/catalog" },
          { title: "Drop/Add Courses", url: "/enrollment/drop-add" },
        ],
      },
      // {
      //   title: "Academic Calendar",
      //   icon: Calendar,
      //   url: "/enrollment/calendar",
      //   items: [
      //     { title: "Important Dates", url: "/enrollment/calendar" },
      //     {
      //       title: "Registration Periods",
      //       url: "/enrollment/calendar/registration",
      //     },
      //     { title: "Holidays & Breaks", url: "/enrollment/calendar/breaks" },
      //   ],
      // },
    ],
  },
  {
    title: "Financial Information",
    items: [
      {
        title: "Tuition & Fees",
        icon: DollarSign,
        url: "/finances/tuition",
        items: [
          { title: "Current Balance", url: "/finances/tuition" },
          { title: "Payment History", url: "/finances/payment-history" },
          { title: "Fee Breakdown", url: "/finances/fees" },
        ],
      },
      {
        title: "Payment Center",
        icon: CreditCard,
        url: "/finances/payments",
        items: [
          { title: "Make Payment", url: "/finances/payments/make" },
          { title: "Payment Plans", url: "/finances/payments/plans" },
        ],
      },
    ],
  },
  // {
  //   title: "Resources & Support",
  //   items: [
  //     {
  //       title: "Library Services",
  //       icon: BookOpen,
  //       url: "/resources/library",
  //       items: [
  //         { title: "Digital Library", url: "/resources/library/digital" },
  //         { title: "Research Databases", url: "/resources/library/databases" },
  //         { title: "Citation Tools", url: "/resources/library/citations" },
  //         { title: "Librarian Chat", url: "/resources/library/help" },
  //       ],
  //     },
  //     {
  //       title: "Student Services",
  //       icon: Users,
  //       url: "/resources/services",
  //       items: [
  //         { title: "Academic Advising", url: "/resources/services/advising" },
  //         { title: "Career Services", url: "/resources/services/career" },
  //         {
  //           title: "Counseling Support",
  //           url: "/resources/services/counseling",
  //         },
  //         { title: "Technical Support", url: "/resources/services/tech" },
  //       ],
  //     },
  //     {
  //       title: "Downloads & Forms",
  //       icon: Download,
  //       url: "/resources/downloads",
  //       items: [
  //         { title: "Course Materials", url: "/resources/downloads/materials" },
  //         { title: "Academic Forms", url: "/resources/downloads/forms" },
  //         { title: "Software Downloads", url: "/resources/downloads/software" },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "Communications",
    items: [
      {
        title: "Messages & Notifications",
        icon: Bell,
        url: "/communications/messages",
        items: [
          { title: "Inbox", url: "/communications/messages/inbox" },
          { title: "Announcements", url: "/communications/announcements" },
          { title: "Notification Settings", url: "/communications/settings" },
        ],
      },
    ],
  },
];

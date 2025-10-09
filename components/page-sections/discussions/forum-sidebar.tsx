"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

interface Forum {
  id: number;
  name: string;
  date: string;
  hasNotification: boolean;
  notificationCount?: number;
  hasGreenDot?: boolean;
  number?: number;
}

interface Course {
  id: string;
  name: string;
  regularCount: number;
  forums: Forum[];
}

interface ForumSidebarProps {
  courses: Course[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onForumSelect: (courseId: string, forumId: number) => void;
}

export function ForumSidebar({
  courses,
  selectedPeriod,
  onPeriodChange,
  searchQuery,
  onSearchChange,
  onForumSelect,
}: ForumSidebarProps) {
  return (
    <Card className="w-80 flex flex-col">
      <CardHeader className="pb-3">
        {/* Period Selector */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <span className="text-muted-foreground font-medium">Period</span>
          <Select
            value={selectedPeriod}
            defaultValue="2022/2023 Odd Semester"
            onValueChange={onPeriodChange}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022/2023 Odd Semester">
                2022/2023 Odd Semester
              </SelectItem>
              <SelectItem value="2022/2023 Even Semester">
                2022/2023 Even Semester
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forum title"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-y-auto">
        <Accordion type="single" collapsible className="w-full">
          {courses.map((course) => (
            <AccordionItem
              key={course.id}
              value={course.id}
              className="border-none"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:cursor-pointer">
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{course.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {course.regularCount.toString().padStart(2, "0")} Regular
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="bg-card space-y-0">
                  {course.forums.map((forum) => (
                    <Button
                      key={forum.id}
                      variant="ghost"
                      className="w-full justify-start rounded-none px-8 py-2 h-auto text-left hover:bg-gray-100"
                      onClick={() => onForumSelect(course.id, forum.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">
                            {forum.number || forum.id}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{forum.name}</span>
                              {forum.hasGreenDot && (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {forum.date}
                            </div>
                          </div>
                        </div>
                        {forum.hasNotification && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {forum.notificationCount}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

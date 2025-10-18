"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface AnnouncementHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick?: () => void;
}

export function AnnouncementHeader({
  searchQuery,
  onSearchChange,
  onFilterClick,
}: AnnouncementHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Title or Author"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-64"
          />
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterClick}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

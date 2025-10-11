"use client";

import { useState } from "react";
import { VirtualClass } from "./types";
import {
  OngoingClassBanner,
  VirtualClassDrawer,
  VirtualClassTable,
} from "./components";
import { SAMPLE_VIRTUAL_CLASSES, ONGOING_CLASS } from "./utils/sample-data";

export function AllVirtualClassesSection() {
  const [classes] = useState<VirtualClass[]>(SAMPLE_VIRTUAL_CLASSES);
  const [ongoingClass] = useState(ONGOING_CLASS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<VirtualClass | null>(null);

  const handleViewClass = (virtualClass: VirtualClass) => {
    setSelectedClass(virtualClass);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Ongoing Class Banner */}
      <OngoingClassBanner ongoingClass={ongoingClass} />

      {/* Virtual Classes Table */}
      <VirtualClassTable classes={classes} onViewClass={handleViewClass} />

      {/* Virtual Class Details Drawer */}
      <VirtualClassDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        selectedClass={selectedClass}
      />
    </div>
  );
}

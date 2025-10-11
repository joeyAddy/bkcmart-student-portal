"use client";

import { useState } from "react";
import { RecordedClass } from "./types";
import { RecordedClassTable } from "./components";
import { SAMPLE_RECORDED_CLASSES } from "./utils/sample-data";

export function AllRecordedClassesSection() {
  const [classes] = useState<RecordedClass[]>(SAMPLE_RECORDED_CLASSES);

  return (
    <div className="space-y-6">
      {/* Recorded Classes Table */}
      <RecordedClassTable classes={classes} />
    </div>
  );
}
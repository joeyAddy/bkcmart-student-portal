import { DeadlinesCalendar } from "./deadlines-calendar";
import { AcademicDeadlines } from "./academic-deadlines";
import { FinancialDeadlines } from "./financial-deadlines";
import { EnrollmentDeadlines } from "./enrollment-deadlines";
import { DocumentDeadlines } from "./document-deadlines";

export function DeadlinesMain() {
  return (
    <div className="space-y-6">
      {/* Main Calendar */}
      <DeadlinesCalendar />

      {/* Deadline Categories */}
      <div className="space-y-6">
        {/* Academic Deadlines */}
        <AcademicDeadlines />

        {/* Financial Deadlines */}
        <FinancialDeadlines />

        {/* Enrollment Deadlines */}
        <EnrollmentDeadlines />

        {/* Document Deadlines */}
        <DocumentDeadlines />
      </div>
    </div>
  );
}

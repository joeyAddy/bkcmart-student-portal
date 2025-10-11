import { DeadlinesCalendar } from "../calendar/deadlines-calendar";
import { AcademicDeadlines } from "../categories/academic-deadlines";
import { FinancialDeadlines } from "../categories/financial-deadlines";
import { EnrollmentDeadlines } from "../categories/enrollment-deadlines";
import { DocumentDeadlines } from "../categories/document-deadlines";

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

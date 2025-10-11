import { Page } from "@/components/shared/page-template";

// Mock assignment data - in a real app, this would come from an API or database
const assignmentData = {
  "research-project-1": {
    title: "Do The Research",
    description:
      "Conduct comprehensive research on the assigned topic and compile findings into a detailed report.",
    dueDate: "October 10, 2025",
    department: "Research",
    status: "In Progress",
  },
  "php-dev-assignment": {
    title: "PHP Development",
    description:
      "Build a web application using PHP and MySQL demonstrating CRUD operations and user authentication.",
    dueDate: "October 9, 2025",
    department: "Computer Science",
    status: "Not Started",
  },
  "graphic-design-task": {
    title: "Graphic Design",
    description:
      "Create a comprehensive brand identity package including logo, color palette, and style guide.",
    dueDate: "October 12, 2025",
    department: "Design",
    status: "In Progress",
  },
};

type AssignmentId = keyof typeof assignmentData;

interface AssignmentPageProps {
  params: {
    id: string;
  };
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
  const assignment = assignmentData[params.id as AssignmentId];

  // If assignment not found, show not found message
  if (!assignment) {
    return (
      <Page
        title="Assignment Not Found"
        description="The requested assignment could not be found."
      >
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            The assignment you&apos;re looking for doesn&apos;t exist or may
            have been removed.
          </p>
        </div>
      </Page>
    );
  }

  return (
    <Page
      title={assignment.title}
      description={`Assignment from ${assignment.department} Department`}
    >
      <div className="space-y-6">
        {/* Assignment Details */}
        <div className="bg-card rounded-lg border p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Due Date
              </h3>
              <p className="mt-1">{assignment.dueDate}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Department
              </h3>
              <p className="mt-1">{assignment.department}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Status
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  assignment.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : assignment.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {assignment.status}
              </span>
            </div>
          </div>
        </div>

        {/* Assignment Description */}
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-medium mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {assignment.description}
          </p>
        </div>

        {/* Assignment Actions */}
        <div className="bg-card rounded-lg border p-6">
          <h3 className="font-medium mb-4">Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Submit Assignment
            </button>
            <button className="border border-input bg-background px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Save Draft
            </button>
            <button className="border border-input bg-background px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              Download Resources
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

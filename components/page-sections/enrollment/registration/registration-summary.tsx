import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

interface RegistrationSummaryProps {
  totalCredits: {
    fall: number;
    spring: number;
    year: number;
  };
  courseCount: {
    fall: number;
    spring: number;
    year: number;
  };
  hasConflicts: boolean;
  conflicts: string[];
  onSubmitRegistration?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

interface CreditLimits {
  minimum: number;
  maximum: number;
  recommended: number;
}

const CREDIT_LIMITS: CreditLimits = {
  minimum: 12,
  maximum: 18,
  recommended: 15,
};

interface SummaryCardProps {
  title: string;
  credits: number;
  courses: number;
  semester: "fall" | "spring" | "year";
  limits: CreditLimits;
}

function SummaryCard({
  title,
  credits,
  courses,
  semester,
  limits,
}: SummaryCardProps) {
  const getCreditStatus = () => {
    if (credits < limits.minimum) return "under";
    if (credits > limits.maximum) return "over";
    if (credits >= limits.minimum && credits <= limits.recommended)
      return "good";
    return "high";
  };

  const status = getCreditStatus();
  const percentage = Math.min((credits / limits.maximum) * 100, 100);

  const getStatusColor = () => {
    switch (status) {
      case "under":
        return "text-orange-600";
      case "over":
        return "text-red-600";
      case "good":
        return "text-green-600";
      case "high":
        return "text-yellow-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "under":
        return `${limits.minimum - credits} credits below minimum`;
      case "over":
        return `${credits - limits.maximum} credits over maximum`;
      case "good":
        return "Within recommended range";
      case "high":
        return "Above recommended, but acceptable";
      default:
        return "";
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case "under":
        return "bg-orange-500";
      case "over":
        return "bg-red-500";
      case "good":
        return "bg-green-500";
      case "high":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{title}</h4>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            {courses} course{courses !== 1 ? "s" : ""}
          </Badge>
          <Badge variant="outline" className={getStatusColor()}>
            {credits} credits
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Credit Load</span>
          <span className={cn("font-medium", getStatusColor())}>
            {credits}/{limits.maximum}
          </span>
        </div>
        <Progress
          value={percentage}
          className={cn("h-2", getProgressColor())}
        />
        <p className={cn("text-xs", getStatusColor())}>{getStatusMessage()}</p>
      </div>

      {semester !== "year" && (
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Minimum:</span>
            <span>{limits.minimum} credits</span>
          </div>
          <div className="flex justify-between">
            <span>Recommended:</span>
            <span>{limits.recommended} credits</span>
          </div>
          <div className="flex justify-between">
            <span>Maximum:</span>
            <span>{limits.maximum} credits</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function RegistrationSummary({
  totalCredits,
  courseCount,
  hasConflicts,
  conflicts,
  onSubmitRegistration,
  isSubmitting = false,
  className,
}: RegistrationSummaryProps) {
  const canSubmit = totalCredits.year > 0 && !hasConflicts;
  const hasMinimumCredits =
    totalCredits.fall >= CREDIT_LIMITS.minimum ||
    totalCredits.spring >= CREDIT_LIMITS.minimum;

  const getOverallStatus = () => {
    if (totalCredits.year === 0) return "empty";
    if (hasConflicts) return "conflicts";
    if (!hasMinimumCredits) return "insufficient";
    if (
      totalCredits.fall > CREDIT_LIMITS.maximum ||
      totalCredits.spring > CREDIT_LIMITS.maximum
    )
      return "overloaded";
    return "ready";
  };

  const status = getOverallStatus();

  const getStatusIcon = () => {
    switch (status) {
      case "empty":
        return <BookOpen className="h-5 w-5 text-muted-foreground" />;
      case "conflicts":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "insufficient":
        return <Clock className="h-5 w-5 text-orange-500" />;
      case "overloaded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "empty":
        return "Add courses to begin registration";
      case "conflicts":
        return "Resolve schedule conflicts to continue";
      case "insufficient":
        return "Add more courses to meet minimum credit requirements";
      case "overloaded":
        return "Credit load exceeds maximum for one or more semesters";
      case "ready":
        return "Ready to submit registration";
      default:
        return "";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Registration Summary</h3>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          {getStatusIcon()}
          <span
            className={cn(
              "font-medium",
              status === "ready" && "text-green-600",
              status === "conflicts" && "text-red-600",
              status === "insufficient" && "text-orange-600",
              status === "overloaded" && "text-yellow-600"
            )}
          >
            {getStatusMessage()}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Semester Summaries */}
        <div className="space-y-4">
          <SummaryCard
            title="Fall Semester"
            credits={totalCredits.fall}
            courses={courseCount.fall}
            semester="fall"
            limits={CREDIT_LIMITS}
          />

          <Separator />

          <SummaryCard
            title="Spring Semester"
            credits={totalCredits.spring}
            courses={courseCount.spring}
            semester="spring"
            limits={CREDIT_LIMITS}
          />

          <Separator />

          {/* Academic Year Summary */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <h4 className="font-medium">Academic Year Total</h4>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {courseCount.year} course{courseCount.year !== 1 ? "s" : ""}
                </Badge>
                <Badge variant="default">{totalCredits.year} credits</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Fall Credits:</span>
                <span className="font-medium ml-2">{totalCredits.fall}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Spring Credits:</span>
                <span className="font-medium ml-2">{totalCredits.spring}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conflicts Warning */}
        {hasConflicts && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-700 text-sm mb-1">
                  Schedule Conflicts
                </h4>
                <p className="text-xs text-red-600 mb-2">
                  Please resolve the following conflicts before submitting:
                </p>
                <ul className="text-xs text-red-600 space-y-1">
                  {conflicts.slice(0, 3).map((conflict, index) => (
                    <li key={index}>• {conflict}</li>
                  ))}
                  {conflicts.length > 3 && (
                    <li>
                      • and {conflicts.length - 3} more conflict
                      {conflicts.length - 3 !== 1 ? "s" : ""}...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {onSubmitRegistration && (
          <Button
            onClick={onSubmitRegistration}
            disabled={!canSubmit || isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Submitting Registration...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Submit Registration
              </>
            )}
          </Button>
        )}

        {/* Registration Guidelines */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p>
            <strong>Registration Guidelines:</strong>
          </p>
          <ul className="space-y-1 ml-2">
            <li>• Minimum: {CREDIT_LIMITS.minimum} credits per semester</li>
            <li>• Maximum: {CREDIT_LIMITS.maximum} credits per semester</li>
            <li>
              • Recommended: {CREDIT_LIMITS.recommended} credits per semester
            </li>
            <li>• Check prerequisites before selecting courses</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

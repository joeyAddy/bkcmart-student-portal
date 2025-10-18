"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Installment {
  number: number;
  amount: number;
  dueDate: string;
  status: "paid" | "upcoming" | "overdue";
  paidDate: string | null;
}

interface InstallmentScheduleCardProps {
  installments: Installment[];
}

export function InstallmentScheduleCard({
  installments,
}: InstallmentScheduleCardProps) {
  const getInstallmentBadge = (status: "paid" | "upcoming" | "overdue") => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="success" className="text-xs">
            Paid
          </Badge>
        );
      case "upcoming":
        return (
          <Badge variant="secondary" className="text-xs">
            Upcoming
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="destructive" className="text-xs">
            Overdue
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Installment Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {installments.map((installment) => (
            <div
              key={installment.number}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border",
                installment.status === "paid" &&
                  "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
                installment.status === "upcoming" &&
                  "bg-secondary/50 border-border"
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    Payment #{installment.number}
                  </span>
                  {getInstallmentBadge(installment.status)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Due:{" "}
                  {new Date(installment.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                {installment.paidDate && (
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Paid:{" "}
                    {new Date(installment.paidDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">
                  ${installment.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

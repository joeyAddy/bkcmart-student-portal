"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";

interface PaymentProgressCardProps {
  currentSemester: string;
  paidAmount: number;
  totalAmount: number;
  remainingAmount: number;
  paymentProgress: number;
}

export function PaymentProgressCard({
  currentSemester,
  paidAmount,
  totalAmount,
  remainingAmount,
  paymentProgress,
}: PaymentProgressCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment Progress</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your tuition payment status for {currentSemester}
            </p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            {currentSemester}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">
              ${paidAmount.toLocaleString()} / ${totalAmount.toLocaleString()}
            </span>
          </div>
          <Progress value={paymentProgress} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {paymentProgress.toFixed(1)}% paid • $
            {remainingAmount.toLocaleString()} remaining
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

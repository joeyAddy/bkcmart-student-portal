"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Clock } from "lucide-react";

interface PaymentPlanInfo {
  planName: string;
  planType: string;
  totalAmount: number;
  paidAmount: number;
  remainingBalance: number;
  nextPaymentAmount: number;
  nextPaymentDate: string;
}

interface PaymentPlanCardProps {
  paymentPlan: PaymentPlanInfo;
}

export function PaymentPlanCard({ paymentPlan }: PaymentPlanCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Payment Plan</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{paymentPlan.planName}</span>
            <Badge variant="secondary" className="text-xs">
              Active
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {paymentPlan.planType}
          </p>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Plan Amount</span>
            <span className="font-medium">
              ${paymentPlan.totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-medium text-green-600">
              ${paymentPlan.paidAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Remaining Balance</span>
            <span className="font-medium text-orange-600">
              ${paymentPlan.remainingBalance.toLocaleString()}
            </span>
          </div>
        </div>

        <Separator />

        {/* Next Payment */}
        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                Next Payment Due
              </p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-orange-700 dark:text-orange-300">
                    Amount
                  </span>
                  <span className="font-bold text-orange-900 dark:text-orange-100">
                    ${paymentPlan.nextPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-700 dark:text-orange-300">
                    Due Date
                  </span>
                  <span className="font-medium text-orange-900 dark:text-orange-100">
                    {new Date(paymentPlan.nextPaymentDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full" size="sm">
          <CreditCard className="h-4 w-4 mr-2" />
          Make Payment
        </Button>
      </CardContent>
    </Card>
  );
}

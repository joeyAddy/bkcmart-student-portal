"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle, Wallet, TrendingUp } from "lucide-react";

interface TuitionStatsCardsProps {
  totalCharges: number;
  amountPaid: number;
  balanceDue: number;
  financialAid: number;
  paymentProgress: number;
  nextPaymentDate: string;
  currentSemester: string;
}

export function TuitionStatsCards({
  totalCharges,
  amountPaid,
  balanceDue,
  financialAid,
  paymentProgress,
  nextPaymentDate,
  currentSemester,
}: TuitionStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Tuition & Fees */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Charges</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalCharges.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">{currentSemester}</p>
        </CardContent>
      </Card>

      {/* Amount Paid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ${amountPaid.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {paymentProgress.toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      {/* Balance Due */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance Due</CardTitle>
          <Wallet className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            ${balanceDue.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Due by {nextPaymentDate}
          </p>
        </CardContent>
      </Card>

      {/* Financial Aid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Financial Aid</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            ${financialAid.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Applied to account</p>
        </CardContent>
      </Card>
    </div>
  );
}

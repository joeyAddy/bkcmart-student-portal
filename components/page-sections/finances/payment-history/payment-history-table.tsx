"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, DollarSign } from "lucide-react";

export interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed" | "refunded";
  transactionId: string;
  semester: string;
}

interface PaymentHistoryTableProps {
  payments: PaymentRecord[];
  isFiltered: boolean;
}

export function PaymentHistoryTable({
  payments,
  isFiltered,
}: PaymentHistoryTableProps) {
  const getStatusBadge = (status: PaymentRecord["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "refunded":
        return <Badge variant="outline">Refunded</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    if (
      method.toLowerCase().includes("card") ||
      method.toLowerCase().includes("credit")
    ) {
      return <CreditCard className="h-4 w-4" />;
    }
    return <DollarSign className="h-4 w-4" />;
  };

  if (payments.length === 0) {
    return (
      <div className="border rounded-lg p-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            {isFiltered ? "No payments found" : "No payment history"}
          </h3>
          <p className="text-muted-foreground">
            {isFiltered
              ? "Try adjusting your search terms to find what you're looking for."
              : "Payment history will appear here once you make payments."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Transaction ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                {new Date(payment.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="font-medium">{payment.description}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getMethodIcon(payment.method)}
                  <span className="text-sm">{payment.method}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {payment.semester}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                <span
                  className={
                    payment.status === "refunded"
                      ? "text-orange-600"
                      : payment.status === "completed"
                      ? "text-green-600"
                      : ""
                  }
                >
                  {payment.status === "refunded" && "-"}$
                  {payment.amount.toFixed(2)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {getStatusBadge(payment.status)}
              </TableCell>
              <TableCell className="text-right">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  {payment.transactionId}
                </code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

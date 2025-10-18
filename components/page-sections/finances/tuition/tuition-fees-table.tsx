"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Download, CheckCircle, Clock, AlertCircle } from "lucide-react";

export interface TuitionFee {
  id: string;
  category: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "waived";
  dueDate: string;
}

interface TuitionFeesTableProps {
  fees: TuitionFee[];
  totalCharges: number;
  financialAid: number;
  netAmount: number;
  currentSemester: string;
}

export function TuitionFeesTable({
  fees,
  totalCharges,
  financialAid,
  netAmount,
  currentSemester,
}: TuitionFeesTableProps) {
  const getStatusBadge = (
    status: "paid" | "pending" | "overdue" | "waived"
  ) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Overdue
          </Badge>
        );
      case "waived":
        return (
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Waived
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tuition & Fees Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Detailed breakdown of all charges for {currentSemester}
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download Statement
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{fee.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {fee.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {fee.dueDate !== "N/A"
                    ? new Date(fee.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {fee.amount > 0 ? `$${fee.amount.toFixed(2)}` : "-"}
                </TableCell>
                <TableCell className="text-right">
                  {getStatusBadge(fee.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Total Charges
              </TableCell>
              <TableCell className="text-right font-bold">
                ${totalCharges.toFixed(2)}
              </TableCell>
              <TableCell />
            </TableRow>
            {financialAid > 0 && (
              <>
                <TableRow>
                  <TableCell colSpan={2} className="text-muted-foreground">
                    Financial Aid Applied
                  </TableCell>
                  <TableCell className="text-right text-green-600 font-medium">
                    -${financialAid.toFixed(2)}
                  </TableCell>
                  <TableCell />
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} className="font-semibold">
                    Net Amount Due
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${netAmount.toFixed(2)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </>
            )}
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

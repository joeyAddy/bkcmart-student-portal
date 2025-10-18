"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, FileText } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/tables/data-table";

export interface PaymentRequest {
  id: string;
  requestDate: string;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "scheduled" | "completed";
  requestType: "tuition" | "fees" | "other";
  semester: string;
  notes?: string;
  adminResponse?: string;
  responseDate?: string;
}

interface PaymentRequestsTableProps {
  requests: PaymentRequest[];
  isFiltered: boolean;
}

// Define table columns
const getColumns = (): ColumnDef<PaymentRequest>[] => [
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("requestDate"));
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div>
          <div className="font-medium">{request.description}</div>
          {request.notes && (
            <div className="text-sm text-muted-foreground mt-1">
              {request.notes}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "requestType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("requestType") as PaymentRequest["requestType"];
      const getTypeIcon = (type: PaymentRequest["requestType"]) => {
        switch (type) {
          case "tuition":
            return <DollarSign className="h-4 w-4" />;
          case "fees":
            return <FileText className="h-4 w-4" />;
          default:
            return <Calendar className="h-4 w-4" />;
        }
      };
      const getTypeLabel = (type: PaymentRequest["requestType"]) => {
        switch (type) {
          case "tuition":
            return "Tuition";
          case "fees":
            return "Fees";
          default:
            return "Other";
        }
      };
      return (
        <div className="flex items-center gap-2">
          {getTypeIcon(type)}
          <span className="text-sm">{getTypeLabel(type)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.getValue("semester")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="text-right font-medium">${amount.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as PaymentRequest["status"];
      const getStatusBadge = (status: PaymentRequest["status"]) => {
        switch (status) {
          case "pending":
            return <Badge variant="secondary">Pending Review</Badge>;
          case "approved":
            return <Badge variant="success">Approved</Badge>;
          case "rejected":
            return <Badge variant="destructive">Rejected</Badge>;
          case "scheduled":
            return <Badge variant="default">Payment Scheduled</Badge>;
          case "completed":
            return <Badge variant="outline">Completed</Badge>;
        }
      };
      return <div className="text-right">{getStatusBadge(status)}</div>;
    },
  },
  {
    accessorKey: "responseDate",
    header: () => <div className="text-right">Response Date</div>,
    cell: ({ row }) => {
      const responseDate = row.getValue("responseDate") as string | undefined;
      return (
        <div className="text-right">
          {responseDate ? (
            new Date(responseDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>
      );
    },
  },
];

export function PaymentRequestsTable({
  requests,
  isFiltered,
}: PaymentRequestsTableProps) {
  if (requests.length === 0) {
    return (
      <div className="border rounded-lg p-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            {isFiltered ? "No requests found" : "No payment requests"}
          </h3>
          <p className="text-muted-foreground">
            {isFiltered
              ? "Try adjusting your search terms to find what you're looking for."
              : "Your payment requests will appear here once you submit them."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={getColumns()}
      data={requests}
      enableRowSelection={false}
      enableDragAndDrop={false}
      enableColumnFilters={false}
      enablePagination={true}
      enableColumnVisibility={true}
      pageSize={10}
    />
  );
}

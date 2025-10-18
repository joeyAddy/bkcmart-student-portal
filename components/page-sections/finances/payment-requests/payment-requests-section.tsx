"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  PaymentRequestsTable,
  type PaymentRequest,
} from "./payment-requests-table";
import NewPaymentRequestModal from "./new-payment-request-modal";

// Mock data for payment requests
const mockRequests: PaymentRequest[] = [
  {
    id: "1",
    requestDate: "2025-10-10",
    description: "November Tuition Payment Request",
    amount: 1267.5,
    status: "pending",
    requestType: "tuition",
    semester: "Fall 2025",
    notes: "Request for November installment payment",
  },
  {
    id: "2",
    requestDate: "2025-09-08",
    description: "Technology Fee Payment",
    amount: 150.0,
    status: "approved",
    requestType: "fees",
    semester: "Fall 2025",
    notes: "Annual technology fee payment",
  },
  {
    id: "3",
    requestDate: "2025-08-15",
    description: "August Tuition Payment",
    amount: 1267.5,
    status: "completed",
    requestType: "tuition",
    semester: "Fall 2025",
    notes: "Regular monthly payment",
  },
  {
    id: "4",
    requestDate: "2025-07-20",
    description: "Summer Course Registration Fee",
    amount: 45.0,
    status: "rejected",
    requestType: "fees",
    semester: "Summer 2025",
    notes: "Late registration fee - denied due to policy violation",
  },
  {
    id: "5",
    requestDate: "2025-06-12",
    description: "Graduation Fee",
    amount: 125.0,
    status: "completed",
    requestType: "fees",
    semester: "Spring 2025",
    notes: "Graduation application fee",
  },
  {
    id: "6",
    requestDate: "2025-05-01",
    description: "May Tuition Payment",
    amount: 1267.5,
    status: "completed",
    requestType: "tuition",
    semester: "Spring 2025",
    notes: "Regular monthly payment - paid in full",
  },
];

export default function PaymentRequestsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests] = useState<PaymentRequest[]>(mockRequests);

  // Filter requests based on search term
  const filteredRequests = useMemo(() => {
    if (!searchTerm) return requests;

    const searchLower = searchTerm.toLowerCase();
    return requests.filter(
      (request) =>
        request.description.toLowerCase().includes(searchLower) ||
        request.requestType.toLowerCase().includes(searchLower) ||
        request.semester.toLowerCase().includes(searchLower) ||
        request.status.toLowerCase().includes(searchLower) ||
        (request.notes && request.notes.toLowerCase().includes(searchLower))
    );
  }, [searchTerm, requests]);

  return (
    <div className="space-y-6">
      {/* Header with Search and New Request Button */}
      <div className="flex items-center justify-between">
        {/* Search Input */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* New Request Button with Modal */}
        <NewPaymentRequestModal />
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredRequests.length} of {requests.length} requests
      </div>

      {/* Payment Requests Table */}
      <PaymentRequestsTable
        requests={filteredRequests}
        isFiltered={searchTerm.length > 0}
      />
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { PaymentSearchBar } from "./payment-search-bar";
import {
  PaymentHistoryTable,
  type PaymentRecord,
} from "./payment-history-table";

// Mock data for payment history
const mockPayments: PaymentRecord[] = [
  {
    id: "1",
    date: "2025-10-13",
    description: "Tuition Payment - October Installment",
    amount: 1287.5,
    method: "Credit Card (**** 4532)",
    status: "completed",
    transactionId: "TXN-2025-001287",
    semester: "Fall 2025",
  },
  {
    id: "2",
    date: "2025-09-12",
    description: "Tuition Payment - September Installment",
    amount: 1287.5,
    method: "ACH Bank Transfer",
    status: "completed",
    transactionId: "TXN-2025-001186",
    semester: "Fall 2025",
  },
  {
    id: "3",
    date: "2025-08-10",
    description: "Tuition Payment - August Installment",
    amount: 1287.5,
    method: "Credit Card (**** 4532)",
    status: "completed",
    transactionId: "TXN-2025-001089",
    semester: "Fall 2025",
  },
  {
    id: "4",
    date: "2025-08-01",
    description: "Technology Fee",
    amount: 150.0,
    method: "Credit Card (**** 4532)",
    status: "completed",
    transactionId: "TXN-2025-001045",
    semester: "Fall 2025",
  },
  {
    id: "5",
    date: "2025-07-28",
    description: "Student Services Fee",
    amount: 85.0,
    method: "Debit Card (**** 7821)",
    status: "completed",
    transactionId: "TXN-2025-001032",
    semester: "Fall 2025",
  },
  {
    id: "6",
    date: "2025-05-15",
    description: "Spring Semester - Final Payment",
    amount: 850.0,
    method: "ACH Bank Transfer",
    status: "completed",
    transactionId: "TXN-2025-000876",
    semester: "Spring 2025",
  },
  {
    id: "7",
    date: "2025-04-12",
    description: "Spring Semester - Installment 3",
    amount: 1200.0,
    method: "Credit Card (**** 4532)",
    status: "completed",
    transactionId: "TXN-2025-000754",
    semester: "Spring 2025",
  },
  {
    id: "8",
    date: "2025-03-10",
    description: "Spring Semester - Installment 2",
    amount: 1200.0,
    method: "Credit Card (**** 4532)",
    status: "completed",
    transactionId: "TXN-2025-000643",
    semester: "Spring 2025",
  },
  {
    id: "9",
    date: "2025-02-08",
    description: "Spring Semester - First Payment",
    amount: 1200.0,
    method: "ACH Bank Transfer",
    status: "completed",
    transactionId: "TXN-2025-000521",
    semester: "Spring 2025",
  },
  {
    id: "10",
    date: "2025-01-25",
    description: "Late Registration Fee",
    amount: 25.0,
    method: "Credit Card (**** 4532)",
    status: "completed",
    transactionId: "TXN-2025-000456",
    semester: "Spring 2025",
  },
  {
    id: "11",
    date: "2024-12-05",
    description: "Graduation Application Fee",
    amount: 100.0,
    method: "Credit Card (**** 4532)",
    status: "completed",
    transactionId: "TXN-2024-001892",
    semester: "Fall 2024",
  },
  {
    id: "12",
    date: "2024-11-10",
    description: "Fall 2024 - Final Payment",
    amount: 945.0,
    method: "ACH Bank Transfer",
    status: "completed",
    transactionId: "TXN-2024-001743",
    semester: "Fall 2024",
  },
];

export function PaymentHistorySection() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter payments based on search term
  const filteredPayments = useMemo(() => {
    if (!searchTerm.trim()) return mockPayments;

    const searchLower = searchTerm.toLowerCase();
    return mockPayments.filter(
      (payment) =>
        payment.description.toLowerCase().includes(searchLower) ||
        payment.amount.toString().includes(searchLower) ||
        payment.method.toLowerCase().includes(searchLower) ||
        payment.transactionId.toLowerCase().includes(searchLower) ||
        payment.semester.toLowerCase().includes(searchLower) ||
        payment.status.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <PaymentSearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        totalResults={mockPayments.length}
        filteredResults={filteredPayments.length}
      />

      {/* Payment History Table */}
      <PaymentHistoryTable
        payments={filteredPayments}
        isFiltered={searchTerm.trim().length > 0}
      />
    </div>
  );
}

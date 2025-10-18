"use client";

import {
  TuitionStatsCards,
  PaymentProgressCard,
  TuitionFeesTable,
  PaymentPlanCard,
  InstallmentScheduleCard,
  type TuitionFee,
} from "./tuition";

// Mock data for tuition and fees
const currentSemester = {
  name: "Fall 2025",
  startDate: "August 28, 2025",
  endDate: "December 20, 2025",
};

const tuitionFees: TuitionFee[] = [
  {
    id: "1",
    category: "Tuition",
    description: "Tuition (12 credit hours @ $385/credit)",
    amount: 4620.0,
    status: "paid" as const,
    dueDate: "2025-08-15",
  },
  {
    id: "2",
    category: "Technology Fee",
    description: "Technology and Online Learning Fee",
    amount: 150.0,
    status: "paid" as const,
    dueDate: "2025-08-15",
  },
  {
    id: "3",
    category: "Student Services",
    description: "Student Services Fee",
    amount: 85.0,
    status: "paid" as const,
    dueDate: "2025-08-15",
  },
  {
    id: "4",
    category: "Library Access",
    description: "Digital Library and Resources Fee",
    amount: 45.0,
    status: "pending" as const,
    dueDate: "2025-10-15",
  },
  {
    id: "5",
    category: "SRP Fee",
    description: "Student Readiness Program (SRP) Fee",
    amount: 125.0,
    status: "paid" as const,
    dueDate: "2025-08-15",
  },
  {
    id: "6",
    category: "SOC Fee",
    description: "Student Orientation and Counseling (SOC) Fee",
    amount: 75.0,
    status: "paid" as const,
    dueDate: "2025-08-15",
  },
  {
    id: "7",
    category: "Activity Fee",
    description: "Virtual Student Activities Fee",
    amount: 30.0,
    status: "pending" as const,
    dueDate: "2025-10-15",
  },
  {
    id: "8",
    category: "Graduation Fee",
    description: "Graduation Application Fee (if applicable)",
    amount: 0.0,
    status: "waived" as const,
    dueDate: "N/A",
  },
];

const paymentPlan = {
  planName: "Monthly Installment Plan",
  planType: "4-Month Payment Plan",
  totalAmount: 5130.0,
  paidAmount: 5025.0,
  remainingBalance: 105.0,
  nextPaymentAmount: 105.0,
  nextPaymentDate: "2025-10-15",
  installments: [
    {
      number: 1,
      amount: 1287.5,
      dueDate: "2025-08-15",
      status: "paid" as const,
      paidDate: "2025-08-10",
    },
    {
      number: 2,
      amount: 1287.5,
      dueDate: "2025-09-15",
      status: "paid" as const,
      paidDate: "2025-09-12",
    },
    {
      number: 3,
      amount: 1287.5,
      dueDate: "2025-10-15",
      status: "paid" as const,
      paidDate: "2025-10-13",
    },
    {
      number: 4,
      amount: 1267.5,
      dueDate: "2025-11-15",
      status: "upcoming" as const,
      paidDate: null,
    },
  ],
};

const financialAid = {
  scholarships: 500.0,
  grants: 0.0,
  loans: 0.0,
  totalAid: 500.0,
};

export function TuitionSection() {
  const totalTuition = tuitionFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = tuitionFees
    .filter((fee) => fee.status === "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = tuitionFees
    .filter((fee) => fee.status === "pending")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const netAmount = totalTuition - financialAid.totalAid;
  const paymentProgress = (paidAmount / totalTuition) * 100;

  return (
    <div className="space-y-6">
      {/* Header Stats Cards */}
      <TuitionStatsCards
        totalCharges={totalTuition}
        amountPaid={paidAmount}
        balanceDue={pendingAmount}
        financialAid={financialAid.totalAid}
        paymentProgress={paymentProgress}
        nextPaymentDate={paymentPlan.nextPaymentDate}
        currentSemester={currentSemester.name}
      />

      {/* Payment Progress */}
      <PaymentProgressCard
        currentSemester={currentSemester.name}
        paidAmount={paidAmount}
        totalAmount={totalTuition}
        remainingAmount={pendingAmount}
        paymentProgress={paymentProgress}
      />

      {/* Bottom Section - Tables and Payment Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Tuition Table */}
        <div className="lg:col-span-2">
          <TuitionFeesTable
            fees={tuitionFees}
            totalCharges={totalTuition}
            financialAid={financialAid.totalAid}
            netAmount={netAmount}
            currentSemester={currentSemester.name}
          />
        </div>

        {/* Right Sidebar - Payment Plan & Installment Schedule */}
        <div className="space-y-6">
          <PaymentPlanCard paymentPlan={paymentPlan} />
          <InstallmentScheduleCard installments={paymentPlan.installments} />
        </div>
      </div>
    </div>
  );
}

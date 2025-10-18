"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/custom/inputs/custom-form-field";
import { FormFieldType } from "@/components/custom/inputs/types";
import { Plus, DollarSign } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Payment Request Form Schema
const PaymentRequestSchema = z.object({
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must not exceed 200 characters"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => {
        const num = parseFloat(val.replace(/[^0-9.-]+/g, ""));
        return !isNaN(num) && num > 0 && num <= 10000;
      },
      {
        message: "Amount must be between $1 and $10,000",
      }
    ),
  requestType: z.string().min(1, "Request type is required"),
  semester: z.string().min(1, "Semester is required"),
  notes: z.string().optional(),
  urgentRequest: z.boolean().default(false),
});

type PaymentRequestFormData = z.infer<typeof PaymentRequestSchema>;

export default function NewPaymentRequestModal() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(PaymentRequestSchema),
    defaultValues: {
      description: "",
      amount: "",
      requestType: "",
      semester: "",
      notes: "",
      urgentRequest: false,
    },
  });

  const handleSubmit = async (data: PaymentRequestFormData) => {
    try {
      console.log("Payment request submitted:", data);

      // TODO: Add API call to submit payment request
      // await submitPaymentRequest(data);

      // Close modal on success
      setIsOpen(false);

      // Reset form
      form.reset();

      // Optional: Show success toast
      // toast.success("Payment request submitted successfully!");
    } catch (error) {
      console.error("Error submitting payment request:", error);
      // Optional: Show error toast
      // toast.error("Failed to submit payment request. Please try again.");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  const requestTypeOptions = [
    { value: "tuition", label: "Tuition Payment" },
    { value: "fees", label: "Fees Payment" },
    { value: "other", label: "Other Payment" },
  ];

  const semesterOptions = [
    { value: "Fall 2025", label: "Fall 2025" },
    { value: "Spring 2026", label: "Spring 2026" },
    { value: "Summer 2026", label: "Summer 2026" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">New Request</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            New Payment Request
          </DialogTitle>
          <DialogDescription>
            Submit a new payment request. The admin will review and send you a
            payment schedule.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Description */}
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control as any}
              name="description"
              label="Description"
              placeholder="Describe the payment request (e.g., November tuition payment, technology fee, etc.)"
            />

            {/* Amount */}
            <CustomFormField
              fieldType={FormFieldType.AMOUNT_INPUT}
              control={form.control as any}
              name="amount"
              label="Amount"
              placeholder="Enter amount"
            />

            {/* Request Type and Semester Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control as any}
                name="requestType"
                label="Request Type"
                placeholder="Select type"
                options={requestTypeOptions}
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control as any}
                name="semester"
                label="Semester"
                placeholder="Select semester"
                options={semesterOptions}
              />
            </div>

            {/* Notes */}
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control as any}
              name="notes"
              label="Additional Notes (Optional)"
              placeholder="Any additional information or special requests..."
            />

            {/* Urgent Request */}
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control as any}
              name="urgentRequest"
              label="Mark as urgent request"
            />

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

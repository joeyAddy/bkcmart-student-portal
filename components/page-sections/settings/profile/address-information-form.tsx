"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CustomFormField, FormFieldType } from "@/components/custom/inputs";

const addressInfoSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State/Province is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
});

type AddressInfoFormData = z.infer<typeof addressInfoSchema>;

export function AddressInformationForm() {
  const form = useForm<AddressInfoFormData>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: {
      address: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (data: AddressInfoFormData) => {
    console.log("Address information:", data);
    // TODO: API call to update address information
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Address */}
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control as any}
            name="address"
            label="Address"
            placeholder="Enter Address"
          />

          {/* Country and State Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control as any}
              name="country"
              label="Country"
              placeholder="Enter Country"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control as any}
              name="state"
              label="State / Province"
              placeholder="Enter State"
            />
          </div>

          {/* City and Postal Code Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control as any}
              name="city"
              label="City"
              placeholder="City"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control as any}
              name="postalCode"
              label="Postal Code"
              placeholder="Enter Postal Code"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

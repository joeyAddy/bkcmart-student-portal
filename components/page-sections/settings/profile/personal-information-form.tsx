"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CustomFormField, FormFieldType } from "@/components/custom/inputs";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  phoneNumber: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function PersonalInformationForm() {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    console.log("Personal information:", data);
    // TODO: API call to update personal information
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control as any}
              name="firstName"
              label="First Name"
              placeholder="Enter First Name"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control as any}
              name="lastName"
              label="Last Name"
              placeholder="Enter Last Name"
            />
          </div>

          {/* Email Address */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control as any}
            name="email"
            label="Email Address"
            placeholder="Enter Email"
            type="email"
          />

          {/* Username and Phone Number Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control as any}
              name="username"
              label="User Name"
              placeholder="Enter User Name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control as any}
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter Phone Number"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

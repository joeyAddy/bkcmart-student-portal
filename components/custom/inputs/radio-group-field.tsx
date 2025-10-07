"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { Control, FieldValues } from "react-hook-form";

interface RadioGroupFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  defaultValue?: string;
  children: React.ReactNode;
}

export function RadioGroupField({
  control,
  name,
  label,
  defaultValue,
  children,
}: RadioGroupFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && (
            <FormLabel className="!text-left">
              {label.replace(/\*$/, "")}
              {label.endsWith("*") && <span className="text-noor-red">*</span>}
            </FormLabel>
          )}
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={defaultValue}
            value={field.value}
            className="flex flex-col space-y-1"
          >
            {children}
          </RadioGroup>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

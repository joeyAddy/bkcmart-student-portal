"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control, FieldValues } from "react-hook-form";

interface CheckboxFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export function CheckboxField({
  control,
  name,
  label,
  disabled,
}: CheckboxFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
              {label && (
                <FormLabel className="!text-left">
                  {label.replace(/\*$/, "")}
                  {label.endsWith("*") && (
                    <span className="text-noor-red">*</span>
                  )}
                </FormLabel>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

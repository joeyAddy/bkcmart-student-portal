"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface AmountInputFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
}

// You'll need to create or import your AmountInputField component
// For now, I'll create a simple version
function AmountInputComponent({
  value,
  onChange,
  placeholder,
  readOnly,
  disabled,
  ...props
}: {
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      className="shad-input"
      {...props}
    />
  );
}

export function AmountInputField({
  control,
  name,
  label,
  placeholder,
  disabled,
  readonly,
}: AmountInputFieldProps) {
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
          <FormControl>
            <AmountInputComponent
              {...field}
              placeholder={placeholder ?? ""}
              onChange={field.onChange}
              readOnly={readonly}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

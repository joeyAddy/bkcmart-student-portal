"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues } from "react-hook-form";

interface TextareaFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  numberOfRows?: number;
}

export function TextareaField({
  control,
  name,
  label,
  placeholder,
  disabled,
  numberOfRows = 3,
}: TextareaFieldProps) {
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
            <Textarea
              {...field}
              rows={numberOfRows}
              placeholder={placeholder}
              className="shad-textArea border-[#d2d2d2] dark:border-gray shadow-none"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

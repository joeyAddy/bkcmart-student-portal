"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Control, FieldValues } from "react-hook-form";

interface PhoneInputFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function PhoneInputField({
  control,
  name,
  label,
  placeholder,
  disabled,
}: PhoneInputFieldProps) {
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
            <PhoneInput
              {...field}
              defaultCountry="NG"
              placeholder={placeholder ?? ""}
              value={
                typeof field.value === "string"
                  ? field.value.toString().replace(" ", "")
                  : field.value
              }
              onChange={field.onChange}
              className="input-phone"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

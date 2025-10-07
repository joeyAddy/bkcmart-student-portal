"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Control, FieldValues } from "react-hook-form";

interface SwitchFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  disabled?: boolean;
}

export function SwitchField({
  control,
  name,
  label,
  disabled,
}: SwitchFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <div className="flex items-center space-x-2">
              <Switch
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
              {label && (
                <Label htmlFor={name} className="text-sm">
                  {label.replace(/\*$/, "")}
                  {label.endsWith("*") && (
                    <span className="text-noor-red">*</span>
                  )}
                </Label>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

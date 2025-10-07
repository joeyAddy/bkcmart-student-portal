"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOff } from "lucide-react";

interface InputFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  type?: string;
  iconSrc?: string;
  iconAlt?: string;
}

export function InputField({
  control,
  name,
  label,
  placeholder,
  disabled,
  readonly,
  className = "",
  type = "text",
  iconSrc,
  iconAlt,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
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
          <div className="relative flex rounded-lg border border-[#d8d8d8]">
            {iconSrc && (
              <Image
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt ?? "icon"}
                className="ml-2"
              />
            )}
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder ?? ""}
                className={cn(
                  "shad-input border-0",
                  isPassword ? "pr-10" : "",
                  className
                )}
                type={isPassword && showPassword ? "text" : type}
                disabled={disabled}
                readOnly={readonly}
              />
            </FormControl>
            {isPassword && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            )}
          </div>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

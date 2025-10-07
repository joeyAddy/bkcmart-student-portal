"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Control, FieldValues } from "react-hook-form";
import { Matcher } from "react-day-picker";

interface DatePickerFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFilter?: Matcher | Matcher[];
  formatDateToDefaultFormat?: (date: Date) => string;
}

export function DatePickerField({
  control,
  name,
  label,
  placeholder = "Pick a date",
  disabled,
  dateFilter,
  formatDateToDefaultFormat,
}: DatePickerFieldProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
          <div className="flex rounded-lg border border-[#d8d8d8]">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={disabled}
                    variant={"ghost"}
                    className={cn(
                      "shad-input border-0 w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="md:!min-w-[200px] p-0 dark:bg-black"
                align="start"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={field.value}
                  onSelect={(event) => {
                    if (event) {
                      const stringDate = formatDateToDefaultFormat
                        ? formatDateToDefaultFormat(event)
                        : event.toISOString();
                      field.onChange(stringDate);
                      setIsPopoverOpen(false);
                    }
                  }}
                  disabled={dateFilter}
                  fromYear={1900}
                  toYear={2030}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

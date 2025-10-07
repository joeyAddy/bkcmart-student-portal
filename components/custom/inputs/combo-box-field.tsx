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
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Control, FieldValues } from "react-hook-form";

interface ComboBoxOption {
  [key: string]: string | number;
}

interface ComboBoxFieldProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: ComboBoxOption[];
  labelKey?: string;
  valueKey?: string;
  saveObjectForComboBox?: boolean;
}

export function ComboBoxField({
  control,
  name,
  label,
  placeholder = "Select an option",
  disabled,
  options = [],
  labelKey = "label",
  valueKey = "value",
  saveObjectForComboBox = false,
}: ComboBoxFieldProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const selectedOptionLabel = (fieldValue: unknown) => {
    if (!fieldValue) {
      return placeholder;
    }

    const selectedOption = saveObjectForComboBox
      ? options.find(
          (option) =>
            option[valueKey] === (fieldValue as ComboBoxOption)?.[valueKey]
        )
      : options.find((option) => option[valueKey] === fieldValue);

    return selectedOption?.[labelKey] || placeholder;
  };

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
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={cn(
                      "w-full justify-between shad-input border-0 dark:!bg-transparent",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {String(selectedOptionLabel(field.value))}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 md:!min-w-[200px] !w-full"
                align="start"
                onEscapeKeyDown={() => setIsPopoverOpen(false)}
              >
                <Command className="!w-full">
                  <CommandInput placeholder={placeholder || "Search..."} />
                  <CommandList className="!w-full">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => {
                        if (!valueKey) {
                          return (
                            <CommandItem key="no-key">
                              No options yet.
                            </CommandItem>
                          );
                        }
                        return (
                          <CommandItem
                            key={String(option[valueKey])}
                            value={String(option[labelKey])}
                            onSelect={() => {
                              if (saveObjectForComboBox) {
                                field.onChange(option);
                              } else {
                                field.onChange(option[valueKey]);
                              }
                              setIsPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === option[valueKey]
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {String(option[labelKey])}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage className="text-noor-red dark:text-orange-500" />
        </FormItem>
      )}
    />
  );
}

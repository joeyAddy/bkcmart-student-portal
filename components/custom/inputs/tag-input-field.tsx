import React, { useState, KeyboardEvent } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { X } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface TagInputFieldProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
}

export function TagInputField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = "Type and press Enter or comma to add",
}: TagInputFieldProps<TFieldValues>) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (value: string[], newTag: string) => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      return [...value, trimmedTag];
    }
    return value;
  };

  const removeTag = (value: string[], tagToRemove: string) => {
    return value.filter((tag) => tag !== tagToRemove);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    fieldValue: string[],
    onChange: (value: string[]) => void
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        onChange(addTag(fieldValue, inputValue));
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && fieldValue.length > 0) {
      onChange(removeTag(fieldValue, fieldValue[fieldValue.length - 1]));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTag = value.replace(",", "").trim();
      if (newTag) {
        // This will be handled by the field's onChange
        setInputValue("");
      }
    } else {
      setInputValue(value);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {/* Input Field */}
              <Input
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) =>
                  handleKeyDown(e, field.value || [], field.onChange)
                }
                onBlur={() => {
                  if (inputValue.trim()) {
                    field.onChange(addTag(field.value || [], inputValue));
                    setInputValue("");
                  }
                }}
              />

              {/* Tags Display in Grid - Right under input */}
              {field.value && field.value.length > 0 && (
                <div className="grid grid-cols-3 gap-1">
                  {field.value.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1 bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 px-2 py-1.5 text-sm font-normal min-w-0 max-w-full"
                    >
                      <span className="truncate flex-1 min-w-0 text-xs">
                        {tag}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(removeTag(field.value, tag))
                        }
                        className="flex-shrink-0 hover:bg-slate-200 hover:text-slate-800 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

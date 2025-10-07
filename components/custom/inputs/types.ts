import { Control, FieldValues } from "react-hook-form";
import { Matcher } from "react-day-picker";
import { ReactNode } from "react";

export enum FormFieldType {
  INPUT = "input",
  FILE_INPUT = "fileInput",
  DROPZONE_FILE_INPUT = "dropzoneFileInput",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  SELECT = "select",
  MULTI_SELECT = "multiSelect",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
  SWITCH = "switch",
  AMOUNT_INPUT = "amountInput",
  COMBO_BOX = "comboBox",
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface BaseFormFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: keyof T;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

export interface CustomFormFieldProps<T extends FieldValues = FieldValues>
  extends BaseFormFieldProps<T> {
  fieldType: FormFieldType;
  type?: string;
  defaultValue?: string;
  iconSrc?: string;
  iconAlt?: string;
  dateFormat?: string;
  dateFilter?: Matcher | Matcher[];
  showTimeSelect?: boolean;
  children?: ReactNode;
  renderSkeleton?: (field: unknown) => ReactNode;
  options?: SelectOption[];
  labelKey?: string;
  valueKey?: string;
  saveObjectForComboBox?: boolean;
  maxFileLength?: number;
  numberOfRows?: number;
  variant?: string;
  animation?: number;
  maxCount?: number;
  onChange?: (value: unknown) => void;
  fileType?: Record<string, string[]>;
}

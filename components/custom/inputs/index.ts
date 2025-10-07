// Individual field components (with FormField wrapper)
export { InputField } from "./input-field";
export { TextareaField } from "./textarea-field";
export { PhoneInputField } from "./phone-input-field";
export { DatePickerField } from "./date-picker-field";
export { SelectField } from "./select-field";
export { CheckboxField } from "./checkbox-field";
export { SwitchField } from "./switch-field";
export { RadioGroupField } from "./radio-group-field";
export { AmountInputField } from "./amount-input-field";
export { ComboBoxField } from "./combo-box-field";
export { TagInputField } from "./tag-input-field";

// Main CustomFormField component
export { default as CustomFormField, FormFieldType } from "./custom-form-field";

// Types
export type {
  FormFieldType as FormFieldTypeEnum,
  BaseFormFieldProps,
  CustomFormFieldProps,
} from "./types";

// Common option types for convenience
export type SelectOption = {
  value: string;
  label: string;
};

export type RadioOption = {
  value: string;
  label: string;
};

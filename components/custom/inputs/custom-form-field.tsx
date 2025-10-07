"use client";

import React from "react";
import { Control, FieldValues } from "react-hook-form";
import { InputField } from "./input-field";
import { TextareaField } from "./textarea-field";
import { PhoneInputField } from "./phone-input-field";
import { DatePickerField } from "./date-picker-field";
import { SelectField } from "./select-field";
import { CheckboxField } from "./checkbox-field";
import { SwitchField } from "./switch-field";
import { RadioGroupField } from "./radio-group-field";
import { AmountInputField } from "./amount-input-field";
import { ComboBoxField } from "./combo-box-field";
import { FormFieldType } from "./types";
import { Matcher } from "react-day-picker";

interface CustomFormFieldProps {
  control: Control<FieldValues>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  readonly?: boolean;
  dateFormat?: string;
  dateFilter?: Matcher | Matcher[];
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: unknown) => React.ReactNode;
  options?: Array<{ [key: string]: string | number }>;
  labelKey?: string;
  valueKey?: string;
  saveObjectForComboBox?: boolean;
  className?: string;
  maxFileLength?: number;
  numberOfRows?: number;
  variant?: string;
  animation?: number;
  maxCount?: number;
  onChange?: (value: unknown) => void;
  fileType?: Record<string, string[]>;
  formatDateToDefaultFormat?: (date: Date) => string;
}

const CustomFormField = (props: CustomFormFieldProps) => {
  const { fieldType } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <InputField
          control={props.control}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readonly={props.readonly}
          className={props.className}
          type={props.type}
          iconSrc={props.iconSrc}
          iconAlt={props.iconAlt}
        />
      );

    case FormFieldType.TEXTAREA:
      return (
        <TextareaField
          control={props.control}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
          numberOfRows={props.numberOfRows}
        />
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInputField
          control={props.control}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      );

    case FormFieldType.DATE_PICKER:
      return (
        <DatePickerField
          control={props.control}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
          dateFilter={props.dateFilter}
          formatDateToDefaultFormat={props.formatDateToDefaultFormat}
        />
      );

    case FormFieldType.SELECT:
      return (
        <SelectField
          control={props.control}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
        >
          {props.children}
        </SelectField>
      );

    case FormFieldType.CHECKBOX:
      return (
        <CheckboxField
          control={props.control}
          name={props.name}
          label={props.label}
          disabled={props.disabled}
        />
      );

    case FormFieldType.SWITCH:
      return (
        <SwitchField
          control={props.control}
          name={props.name}
          label={props.label}
          disabled={props.disabled}
        />
      );

    case FormFieldType.RADIO:
      return (
        <RadioGroupField
          control={props.control}
          name={props.name}
          label={props.label}
          defaultValue={props.defaultValue}
        >
          {props.children}
        </RadioGroupField>
      );

    case FormFieldType.AMOUNT_INPUT:
      return (
        <AmountInputField
          control={props.control}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readonly={props.readonly}
        />
      );

    case FormFieldType.COMBO_BOX:
      return (
        <ComboBoxField
          control={props.control}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          disabled={props.disabled}
          options={props.options}
          labelKey={props.labelKey}
          valueKey={props.valueKey}
          saveObjectForComboBox={props.saveObjectForComboBox}
        />
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(null) : null;

    case FormFieldType.FILE_INPUT:
    case FormFieldType.DROPZONE_FILE_INPUT:
    case FormFieldType.MULTI_SELECT:
      // These would need additional components to be created
      return (
        <div className="text-muted-foreground p-4 border-2 border-dashed rounded-lg">
          Component not implemented: {fieldType}
        </div>
      );

    default:
      return null;
  }
};

export default CustomFormField;
export { FormFieldType };

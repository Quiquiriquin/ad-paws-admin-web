"use client";

import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import Label from "./Label";

export type SelectOption = {
  value: string | number;
  label: string;
};

export type FormSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  options: SelectOption[];
  rules?: {
    required?: boolean | string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  classToForce?: string;
  mode?: "multiple" | "tags";
  showSearch?: boolean;
  allowClear?: boolean;
};

const FormSelect = ({
  name,
  label,
  placeholder,
  defaultValue = "",
  disabled = false,
  options = [],
  rules,
  classToForce = "",
  mode,
  showSearch = false,
  allowClear = false,
}: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1 relative">
          <Label
            className={`text-sm font-bold px-[7px] dark:text-neutral-200 tracking-normal ${classToForce}`}
          >
            {label}
          </Label>
          <Select
            style={{
              fontWeight: 500,
              width: "100%",
            }}
            size="large"
            placeholder={placeholder}
            disabled={disabled}
            options={options}
            mode={mode}
            showSearch={showSearch}
            allowClear={allowClear}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            value={field.value === "" ? undefined : field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          {fieldState.error && (
            <label
              className="bottom-[-18px] left-[12px pl-3 text-xs"
              style={{
                color: "#D9625F",
                fontWeight: 500,
              }}
            >
              {fieldState.error?.message}
            </label>
          )}
        </div>
      )}
    />
  );
};

export default FormSelect;

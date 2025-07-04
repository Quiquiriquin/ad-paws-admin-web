import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import Label from "./Label";

export type FormInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  rules?: {
    required?: boolean | string;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  classToForce?: string;
  className?: string;
  minValue?: number; // Optional prop for minimum value
};

const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
  defaultValue = "",
  disabled = false,
  rules,
  classToForce = "",
  className = "",
  minValue,
  //   errorMessage,
  //   className,
}: FormInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={`relative flex flex-col gap-1 ${className}`}>
          <Label
            className={`text-sm font-bold px-[7px] dark:text-neutral-200 tracking-normal ${classToForce}`}
          >
            {label}
          </Label>
          <Input
            style={{
              fontWeight: 500,
            }}
            size="large"
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            {...(minValue !== undefined ? { min: minValue } : {})}
            {...field}
          />
          {fieldState.error && (
            <label
              className="bottom-[-18px] left-[12px] pl-3 text-xs"
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

export default FormInput;

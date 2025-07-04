"use client";

import type React from "react";
import { Input, Select, Space } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Label from "./Label";

// Common country codes
const countryCodes = [
  { value: "+1", label: "+1", flag: "🇺🇸" },
  { value: "+44", label: "+44", flag: "🇬🇧" },
  { value: "+34", label: "+34", flag: "🇪🇸" },
  { value: "+52", label: "+52", flag: "🇲🇽" },
  { value: "+33", label: "+33", flag: "🇫🇷" },
  { value: "+49", label: "+49", flag: "🇩🇪" },
  { value: "+39", label: "+39", flag: "🇮🇹" },
  { value: "+81", label: "+81", flag: "🇯🇵" },
  { value: "+86", label: "+86", flag: "🇨🇳" },
  { value: "+91", label: "+91", flag: "🇮🇳" },
];

// Format patterns for different country codes
const formatPatterns: Record<string, (phone: string) => string> = {
  // US/Canada: (123) 456-7890
  "+1": (phone: string) => {
    if (phone.length === 0) return "";
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  },
  // Spain: 123 456 789
  "+34": (phone: string) => {
    if (phone.length === 0) return "";
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `${phone.slice(0, 3)} ${phone.slice(3)}`;
    return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)}`;
  },
  // Mexico: 123 456 7890
  "+52": (phone: string) => {
    if (phone.length === 0) return "";
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `${phone.slice(0, 3)} ${phone.slice(3)}`;
    return `${phone.slice(0, 2)} ${phone.slice(2, 6)} ${phone.slice(6, 10)}`;
  },
  // Default format with spaces every 3 digits
  default: (phone: string) => {
    return phone.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
  },
};

// Function to format phone number based on country code
const formatPhoneNumber = (phone: string, countryCode: string): string => {
  const formatter = formatPatterns[countryCode] || formatPatterns.default;
  return formatter(phone);
};

// Function to strip formatting from phone number
const stripFormatting = (phone: string): string => {
  return phone.replace(/[^\d]/g, "");
};

interface PhoneInputProps {
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
  defaultCountryCode?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  label,
  placeholder,
  rules,
  defaultCountryCode = "+1",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  // Get the error message for this field
  const errorMessage = errors[name]?.message as string;

  return (
    <div className="flex flex-col gap-2 mt-4 relative">
      <Label
        className={`text-sm font-bold px-[7px] dark:text-light tracking-normal`}
      >
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          pattern: {
            value: /^[+]?[\d\s]*$/,
            message: t("phone-numbers-only"),
          },
        }}
        render={({ field }) => {
          // Split the value into country code and phone number
          const value = field.value || "";
          const hasCountryCode = countryCodes.some((code) =>
            value.startsWith(code.value)
          );

          let countryCode = defaultCountryCode;
          let rawPhoneNumber = "";

          if (hasCountryCode) {
            // Find the country code in the value
            const codeObj = countryCodes.find((code) =>
              value.startsWith(code.value)
            );
            if (codeObj) {
              countryCode = codeObj.value;
              // Extract the raw phone number without formatting
              rawPhoneNumber = value
                .substring(countryCode.length)
                .replace(/[^\d]/g, "");
            }
          } else if (value) {
            // If there's a value but no country code, assume it's just the phone number
            rawPhoneNumber = value.replace(/[^\d]/g, "");
          }

          // Format the phone number for display
          const formattedPhoneNumber = formatPhoneNumber(
            rawPhoneNumber,
            countryCode
          );

          const handleCountryChange = (newCode: string) => {
            // When country code changes, keep the raw phone number but update the format
            field.onChange(newCode + rawPhoneNumber);
          };

          const handlePhoneChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            // Get the raw input value and strip any non-digit characters
            const inputValue = e.target.value;
            const newRawPhone = stripFormatting(inputValue);

            // Only proceed if the input contains only digits
            if (/^\d*$/.test(newRawPhone)) {
              // Store the raw number in the form state with the country code
              field.onChange(countryCode + newRawPhone);
            }
          };

          return (
            <Space.Compact style={{ width: "100%" }}>
              <Select
                size="large"
                style={{ width: "30%" }}
                value={countryCode}
                onChange={handleCountryChange}
                options={countryCodes.map((code) => ({
                  value: code.value,
                  label: (
                    <span>
                      {code.flag} {code.label}
                    </span>
                  ),
                }))}
              />
              <Input
                size="large"
                style={{ width: "70%" }}
                placeholder={placeholder || t("phone-placeholder")}
                value={formattedPhoneNumber}
                onChange={handlePhoneChange}
                onBlur={field.onBlur}
              />
            </Space.Compact>
          );
        }}
      />
    </div>
  );
};

export default PhoneInput;

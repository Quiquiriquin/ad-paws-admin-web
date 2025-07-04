"use client";

import { useFormContext } from "react-hook-form";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import { dogBreedSelectableOptions } from "@/utils/breed.catalog";
import { dogSizeOptions } from "@/utils/size.catalog";

const formInputs = [
  {
    label: "Nombre",
    name: "name",
    type: "text",
    placeholder: "Chloe",
    className: "flex-1",
    rules: {
      required: "El nombre es requerido",
    },
  },
  {
    label: "Raza",
    name: "breed",
    type: "text",
    placeholder: "Labrador",
    inputType: "select",
    options: dogBreedSelectableOptions,
    className: "flex-1",
    rules: {
      required: "La raza es requerida",
    },
  },
  {
    label: "Tamaño",
    name: "size",
    type: "text",
    placeholder: "Grande",
    inputType: "select",
    options: dogSizeOptions,
    className: "flex-1",
    rules: {
      required: "El tamaño es requerido",
    },
  },
  {
    label: "Color",
    name: "color",
    type: "text",
    placeholder: "Marrón",
    className: "flex-1",
    rules: {
      required: "El color es requerido",
    },
  },
  {
    label: "Edad (años)",
    name: "age",
    type: "number",
    placeholder: "2",
    minValue: 1,
    className: "flex-1",
    rules: {
      required: "La edad es requerida",
      min: {
        value: 0,
        message: "La edad debe ser un número positivo",
      },
    },
  },
  {
    label: "Peso (kg)",
    name: "weight",
    type: "number",
    placeholder: "30",
    className: "flex-1",
    minValue: 1,
    rules: {
      required: "El peso es requerido",
      min: {
        value: 0,
        message: "El peso debe ser un número positivo",
      },
    },
  },
];

const DogForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { handleSubmit } = useFormContext();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6 mx-auto w-full"
    >
      {formInputs.map((input: any) =>
        input.inputType === "select" ? (
          <FormSelect
            showSearch
            key={input.name}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            rules={input.rules}
            options={input.options || []} // Assuming options are passed as a prop
          />
        ) : (
          <FormInput
            key={input.name}
            label={input.label}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            className={`${input.className} w-full`}
            rules={input.rules}
            minValue={input.minValue}
          />
        )
      )}
    </form>
  );
};

export default DogForm;

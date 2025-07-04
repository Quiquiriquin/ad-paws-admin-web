"use client";
import { Button } from "antd";
import FormInput from "../ui/FormInput";
import { useFormContext } from "react-hook-form";

const inlineInputs = [
  {
    label: "Nombre",
    name: "name",
    type: "text",
    placeholder: "Juan",
    className: "flex-1",
    rules: {
      required: "El nombre es requerido",
    },
  },
  {
    label: "Apellido",
    name: "lastname",
    type: "text",
    placeholder: "Pérez",
    className: "flex-1",
    rules: {
      required: "El apellido es requerido",
    },
  },
];

const blockInputs = [
  {
    label: "Correo Electrónico",
    name: "email",
    type: "email",
    className: "w-full mt-4",
    placeholder: "correo@ejemplo.com",
    rules: {
      required: "El correo electrónico es requerido",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "El correo electrónico no es válido",
      },
    },
  },
  {
    label: "Teléfono",
    name: "phone",
    type: "text",
    placeholder: "5535220451",
    className: "w-full mt-4",
    rules: {
      required: "El número de teléfono es requerido",
      pattern: {
        value: /^\d{10}$/,
        message: "El número de teléfono debe tener 10 dígitos",
      },
    },
  },
  {
    label: "Contraseña",
    name: "password",
    type: "password",
    placeholder: "********",
    className: "w-full mt-4",
    rules: {
      required: "La contraseña es requerida",
      minLength: {
        value: 6,
        message: "La contraseña debe tener al menos 6 caracteres",
      },
    },
  },
];

const RegistrationForm = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
  loading?: boolean;
}) => {
  const { formState, handleSubmit } = useFormContext();
  const renderInputs = (inputsToBeRendered: any) => {
    return inputsToBeRendered?.map((input: any) => (
      <FormInput
        key={input.name}
        label={input.label}
        name={input.name}
        type={input.type}
        placeholder={input.placeholder}
        className={input.className}
        rules={input.rules}
      />
    ));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Inline inputs for larger screens, stacked on mobile */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {renderInputs(inlineInputs)}
      </div>

      {/* Block inputs */}
      <div className="space-y-4">{renderInputs(blockInputs)}</div>

      <Button
        htmlType="submit"
        variant="solid"
        color="primary"
        className="w-full mt-6 md:mt-8"
        size="large"
        disabled={!formState.isValid}
      >
        Continuar a mascotas
      </Button>
    </form>
  );
};

export default RegistrationForm;

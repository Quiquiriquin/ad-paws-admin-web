import React from "react";
import Label from "../ui/Label";

export const HeaderLabels = ({ step = 1 }: { step: number }) => {
  return (
    <div className="mb-4 md:mb-6">
      <h1 className="text-center">
        <Label className="text-lg md:text-xl font-bold">
          {step === 1 ? "Crea tu cuenta" : "Ingresa los datos de tu peludo"}
        </Label>
      </h1>
      <h3 className="text-center mt-2">
        <Label className="text-xs md:text-sm">
          {step === 1
            ? "Ingresa tus datos personales para crear tu cuenta."
            : "Agrega los datos de tu mascota para completar el registro."}
        </Label>
      </h3>
    </div>
  );
};

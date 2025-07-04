"use client";

import type React from "react";
import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const { TextArea } = Input;

const CheckInNotes: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const notes = watch("notes");

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue("notes", e.target.value);
  };

  return (
    <TextArea
      placeholder="Añade cualquier información adicional relevante para el cuidado de la mascota..."
      value={notes}
      onChange={handleNotesChange}
      rows={6}
      style={{ resize: "none" }}
    />
  );
};

export default CheckInNotes;

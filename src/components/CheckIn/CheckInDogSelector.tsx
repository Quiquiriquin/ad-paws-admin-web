"use client";

import React, { useEffect, useState } from "react";
import { Select, Avatar, Space } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import type { Pet } from "@/components/ui/PetCard";

interface CheckInDogSelectorProps {
  selectedDog?: Pet | null;
  availableDogs?: Pet[];
  setCurrentDog: (dog: Pet | null) => void;
  currentDog?: Pet | null;
}

const CheckInDogSelector: React.FC<CheckInDogSelectorProps> = ({
  availableDogs = [],
  setCurrentDog,
  currentDog,
}) => {
  const { setFocus, watch, control } = useFormContext();
  const dogId = watch("dogId");
  useEffect(() => {
    if (dogId) {
      const dog = availableDogs.find((d) => d.id === dogId);
      setCurrentDog(dog || null);
    }
  }, [dogId]);

  return (
    <div>
      <Controller
        name="dogId"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            autoFocus
            style={{ width: "100%" }}
            placeholder="Selecciona una mascota"
            value={value || undefined}
            onChange={onChange}
            optionLabelProp="label"
            size="large"
            showSearch
          >
            {availableDogs.map((dog) => (
              <Select.Option key={dog.id} value={dog.id} label={dog.name}>
                <Space className="flex items-center gap-2 h-full">
                  <Avatar src={dog.imageUrl} size="small">
                    {dog.name.charAt(0)}
                  </Avatar>
                  <span>{dog.name}</span>
                  <span className="text-gray-400 text-xs">({dog.breed})</span>
                </Space>
              </Select.Option>
            ))}
          </Select>
        )}
      />

      {currentDog && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <Avatar src={currentDog.imageUrl} size={64}>
              {currentDog.name.charAt(0)}
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">{currentDog.name}</h3>
              <p className="text-gray-500">
                {currentDog.breed} • {currentDog.age} años
              </p>
              <p className="text-gray-500">
                Dueño: {currentDog.owner?.name} {currentDog.owner?.lastname}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInDogSelector;

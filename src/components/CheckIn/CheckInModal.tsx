"use client";

import type React from "react";
import { Modal, Button, Typography, message, Calendar, DatePicker } from "antd";
import { Controller, FormProvider, useForm } from "react-hook-form";
import type { Pet } from "@/components/ui/PetCard";
import CheckInDogSelector from "./CheckInDogSelector";
import CheckInServiceSelector from "./CheckInServiceSelector";
import CheckInItemsList from "./CheckInItemsList";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

export type CheckInFormData = {
  dogId: number;
  service: "daycare" | "hotel" | "entrenamiento";
  bookingDates?: [string, string]; // Only for hotel service
  itemsLeft: {
    leash: boolean;
    collar: boolean;
    bed: boolean;
    toys: boolean;
    food: boolean;
    meds: boolean;
    plate: boolean;
    other: boolean;
    otherDescription?: string;
  };
  extraServices: {
    natacion: boolean;
    peluqueria: boolean;
    entrenamiento: boolean;
    paseo: boolean;
    juego: boolean;
  };
  notes: string;
};

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CheckInFormData) => void;
  selectedDog?: Pet | null;
  availableDogs?: Pet[];
}

const CheckInModal: React.FC<CheckInModalProps> = ({
  open,
  onClose,
  onSubmit,
  selectedDog,
  availableDogs = [],
}) => {
  const [currentDog, setCurrentDog] = useState<Pet | null>(null);
  const methods = useForm<CheckInFormData>({
    defaultValues: {
      dogId: selectedDog?.id || 0,
      service: "daycare",
      bookingDates: undefined, // Only for hotel service
      itemsLeft: {
        leash: false,
        collar: false,
        bed: false,
        toys: false,
        food: false,
        meds: false,
        plate: false,
        other: false,
        otherDescription: "",
      },
      extraServices: {
        natacion: false,
        peluqueria: false,
        entrenamiento: false,
        paseo: false,
        juego: false,
      },
      notes: "",
    },
  });

  const handleSubmit = (data: CheckInFormData) => {
    console.log("Form submitted:", data);
    onSubmit(data);
    message.success("Registro de entrada completado con éxito");
    onClose();
  };

  const getHowManyNights = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  const bookingDates = methods.watch("bookingDates");

  const close = () => {
    methods.reset();
    setCurrentDog(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={close}
      title={<Title level={4}>Registro de Entrada</Title>}
      width="70vw"
      footer={null}
      centered
      style={{ height: "95dvh" }}
      styles={{
        body: {
          height: "calc(95dvh - 110px)", // Subtract header height
          overflow: "hidden",
          padding: 0,
        },
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="h-full flex flex-col"
        >
          <div className="flex-1 px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-1s gap-6 h-full">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Selección de mascota */}
                <div>
                  <Title level={5} className="!mb-2">
                    Mascota
                  </Title>
                  <CheckInDogSelector
                    currentDog={currentDog}
                    setCurrentDog={setCurrentDog}
                    availableDogs={availableDogs}
                  />
                </div>

                {/* Selección de servicio */}
                <div>
                  <Title level={5} className="!mb-2">
                    Servicio
                  </Title>
                  <CheckInServiceSelector />
                </div>

                {methods.getValues("service") === "hotel" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Title level={5} className="!mb-2">
                        Selecciona la fecha de entrada y salida
                      </Title>
                      <Controller
                        name="bookingDates"
                        render={({ field }) => (
                          <DatePicker.RangePicker {...field} size="large" />
                        )}
                      />
                    </div>
                    {bookingDates && bookingDates.length === 2 && (
                      <div>
                        <Title level={5} className="!mb-2">
                          Total de noches
                        </Title>
                        <label className="text-base block h-[40px] flex items-center">
                          <span>
                            {currentDog?.name} estará en el hotel por &nbsp;
                          </span>
                          <span className="font-semibold">
                            {currentDog
                              ? (() => {
                                  const bookingDates =
                                    methods.getValues("bookingDates");
                                  if (
                                    bookingDates &&
                                    Array.isArray(bookingDates) &&
                                    bookingDates.length === 2
                                  ) {
                                    return `${getHowManyNights(
                                      bookingDates[0],
                                      bookingDates[1]
                                    )} noches`;
                                  }
                                  return "0 noches";
                                })()
                              : "0 noches"}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                )}

                {/* Notas */}
                {/* <div className="flex-1">
                  <Title level={5} className="!mb-2">
                    Notas adicionales
                  </Title>
                  <CheckInNotes />
                </div> */}
                <div>
                  <Title level={5} className="!mb-2">
                    Artículos dejados por el dueño
                  </Title>
                  <Text type="secondary" className="block mb-3 text-sm">
                    Selecciona todos los artículos que el dueño ha dejado con la
                    mascota
                  </Text>
                  <CheckInItemsList />
                </div>
              </div>

              {/* Right Column */}
              {/* <div className="space-y-4">
                <div>
                  <Title level={5} className="!mb-2">
                    Artículos dejados por el dueño
                  </Title>
                  <Text type="secondary" className="block mb-3 text-sm">
                    Selecciona todos los artículos que el dueño ha dejado con la
                    mascota
                  </Text>
                  <CheckInItemsList />
                </div>

                <div>
                  <Title level={5} className="!mb-2">
                    Servicios adicionales
                  </Title>
                  <Text type="secondary" className="block mb-3 text-sm">
                    Selecciona los servicios adicionales solicitados
                  </Text>
                  <CheckInExtraServices />
                </div>
              </div> */}
            </div>
          </div>

          {/* Botones de acción - Fixed at bottom */}
          <div className="flex justify-end gap-3 p-6 border-t bg-white">
            <Button onClick={close}>Cancelar</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#4B9460" }}
            >
              Completar Registro
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default CheckInModal;

"use client";

import type React from "react";
import { Checkbox, Row, Col, Tag } from "antd";
import { useFormContext } from "react-hook-form";
import {
  FishIcon as Swim,
  Scissors,
  Activity,
  Map,
  PlayCircle,
} from "lucide-react";

const CheckInExtraServices: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const extraServices = watch("extraServices");

  const handleServiceChange = (service: string, checked: boolean) => {
    setValue(`extraServices.${service}`, checked);
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "natacion":
        return <Swim className="w-4 h-4" />;
      case "peluqueria":
        return <Scissors className="w-4 h-4" />;
      case "entrenamiento":
        return <Activity className="w-4 h-4" />;
      case "paseo":
        return <Map className="w-4 h-4" />;
      case "juego":
        return <PlayCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case "natacion":
        return "blue";
      case "peluqueria":
        return "purple";
      case "entrenamiento":
        return "green";
      case "paseo":
        return "orange";
      case "juego":
        return "cyan";
      default:
        return "default";
    }
  };

  const services = [
    { key: "natacion", label: "Natación", price: "$150" },
    { key: "peluqueria", label: "Peluquería", price: "$250" },
    { key: "entrenamiento", label: "Entrenamiento", price: "$200" },
    { key: "paseo", label: "Paseo", price: "$100" },
    { key: "juego", label: "Tiempo de juego", price: "$80" },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {services.map((service) => (
          <Col span={12} key={service.key}>
            <div
              className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
                extraServices[service.key as keyof typeof extraServices]
                  ? `border-${getServiceColor(service.key)}-500 bg-${getServiceColor(service.key)}-50`
                  : ""
              }`}
            >
              <Checkbox
                checked={
                  extraServices[service.key as keyof typeof extraServices]
                }
                onChange={(e) =>
                  handleServiceChange(service.key, e.target.checked)
                }
              >
                <div className="flex items-center gap-2">
                  <span className={`text-${getServiceColor(service.key)}-500`}>
                    {getServiceIcon(service.key)}
                  </span>
                  <span>{service.label}</span>
                </div>
              </Checkbox>
              <Tag color={getServiceColor(service.key)}>{service.price}</Tag>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CheckInExtraServices;

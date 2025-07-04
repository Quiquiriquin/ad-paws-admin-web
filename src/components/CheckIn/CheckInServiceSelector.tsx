"use client";

import type React from "react";
import { Col, Row, Space } from "antd";
import { useFormContext } from "react-hook-form";
import { Calendar, Hotel, Activity } from "lucide-react";

const CheckInServiceSelector: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const selectedService = watch("service");

  const handleServiceClick = (service: string) => {
    setValue("service", service);
  };

  const services = [
    {
      value: "daycare",
      icon: Calendar,
      title: "Guardería",
      description: "Cuidado durante el día",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      selectedBorder: "border-green-500",
      selectedBg: "bg-green-50",
    },
    {
      value: "hotel",
      icon: Hotel,
      title: "Hotel",
      description: "Estancia con alojamiento",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      selectedBorder: "border-purple-500",
      selectedBg: "bg-purple-50",
    },
    // {
    //   value: "entrenamiento",
    //   icon: Activity,
    //   title: "Entrenamiento",
    //   description: "Sesión de entrenamiento",
    //   iconBg: "bg-blue-100",
    //   iconColor: "text-blue-600",
    //   selectedBorder: "border-blue-500",
    //   selectedBg: "bg-blue-50",
    // },
  ];

  return (
    <div className="w-full">
      <Row className="w-full" gutter={16}>
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.value;

          return (
            <Col span={12} key={service.value}>
              <div
                onClick={() => handleServiceClick(service.value)}
                className={`p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? `${service.selectedBorder} ${service.selectedBg} shadow-sm`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`p-2 ${service.iconBg} rounded-full w-max`}>
                  <Icon className={`w-5 h-5 ${service.iconColor}`} />
                </div>
                <div>
                  <div className="font-medium">{service.title}</div>
                  <div className="text-sm text-gray-500">
                    {service.description}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CheckInServiceSelector;

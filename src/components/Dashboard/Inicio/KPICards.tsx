import DogAppCard from "@/components/ui/DogAppCard";
import PercentageBar from "@/components/ui/PercentageBar";
import StatText from "@/components/ui/StatText";
import { dashboardData } from "@/routes/negocio/dashboard/inicio";
import { Dog, Hotel } from "lucide-react";
import React from "react";

const KPICards = () => {
  const attendancePercentage = Math.round(
    (dashboardData.attendance.current / dashboardData.attendance.expected) * 100
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Current Attendance */}
      <div className="bg-white  rounded-lg shadow-md p-9 w-full! border-l-4 border-l-green-500 shadow-lg">
        <div className="flex items-center justify-between">
          <StatText
            label="Casa Pek"
            value={dashboardData.attendance.current}
            description={`de ${dashboardData.attendance.expected} esperados`}
          />
          <div className="p-3 bg-green-100 rounded-full">
            <Dog className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <PercentageBar percentage={22} label="de capacidad" />
        </div>
      </div>

      {/* Check-ins Today */}
      <div className="bg-white  rounded-lg shadow-md p-9 w-full! border-l-4 border-l-blue-500 shadow-lg">
        <div className="flex items-center justify-between">
          <StatText
            label="Pek University"
            value={dashboardData.attendance.current}
            description={`de ${dashboardData.attendance.expected} esperados`}
          />
          <div className="p-3 bg-green-100 rounded-full">
            <Dog className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <PercentageBar
            percentage={attendancePercentage}
            label="de capacidad"
          />
        </div>
      </div>

      {/* Hotel Occupancy */}
      <div className="bg-white  rounded-lg shadow-md p-9 w-full! border-l-4 border-l-purple-500 shadow-lg">
        <div className="flex items-center justify-between">
          <StatText
            label="Hotel"
            value={dashboardData.services.hotel.current}
            description={`habitaciones ocupadas`}
          />
          <div className="p-3 bg-purple-100 rounded-full">
            <Hotel className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <PercentageBar
            percentage={45}
            color="bg-purple-500"
            label="de capacidad"
          />
        </div>
      </div>
    </div>
  );
};

export default KPICards;

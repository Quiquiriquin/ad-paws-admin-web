import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Hotel, Plus } from "lucide-react";
import { Button } from "antd";
import KPICards from "@/components/Dashboard/Inicio/KPICards";
import ActivityItem from "@/components/ui/Activity";
import ServiceStatusCard from "@/components/ui/StatusCard";
import QuickCheckInButton from "@/components/Dashboard/QuickCheckInButton";

export const Route = createFileRoute("/negocio/dashboard/inicio")({
  component: RouteComponent,
});

// Mock data - in a real app this would come from your API
export const dashboardData = {
  attendance: {
    current: 24,
    expected: 32,
    checkedIn: 24,
    checkedOut: 8,
  },
  services: {
    daycare: {
      active: 18,
      scheduled: 22,
    },
    hotel: {
      current: 6,
      checkingOut: 2,
      checkingIn: 3,
    },
    activities: {
      grooming: 4,
      training: 2,
      playtime: 8,
    },
  },
  recentActivity: [
    {
      id: 1,
      dog: "Max",
      action: "Check-in",
      time: "09:30 AM",
      type: "daycare",
    },
    {
      id: 2,
      dog: "Luna",
      action: "Grooming completed",
      time: "09:15 AM",
      type: "activity",
    },
    {
      id: 3,
      dog: "Rocky",
      action: "Check-out",
      time: "08:45 AM",
      type: "hotel",
    },
    {
      id: 4,
      dog: "Bella",
      action: "Training session",
      time: "08:30 AM",
      type: "activity",
    },
  ],
};

function RouteComponent() {
  const attendancePercentage = Math.round(
    (dashboardData.attendance.current / dashboardData.attendance.expected) * 100
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            ¡Bienvenido de vuelta!
          </h2>
          <p className="text-gray-600">
            Aquí tienes el resumen de las actividades de hoy
          </p>
        </div>
        <div className="flex gap-2">
          <QuickCheckInButton />
          <Button size="large">
            <Plus className="w-4 h-4" />
            Nueva Reserva
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <KPICards />

      {/* Services Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Daycare & Hotel Status */}
        <div className="bg-white  rounded-lg shadow-md p-9 col-span-2 w-full!">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Estado de Servicios
            </h3>
          </div>
          <div className="mb-4">
            <ServiceStatusCard
              icon={<Calendar className="w-4 h-4 text-green-600" />}
              iconBg="bg-green-100"
              cardBg="bg-green-50"
              title="Guardería"
              description={`${dashboardData.services.daycare.active} activos de ${dashboardData.services.daycare.scheduled} programados`}
              value={dashboardData.services.daycare.active}
              valueBg="bg-[#4B9460] text-neutral-200"
            />
          </div>

          <div className="mb-4">
            <ServiceStatusCard
              icon={<Hotel className="w-4 h-4 text-purple-600" />}
              iconBg="bg-purple-100"
              cardBg="bg-purple-50"
              title="Hotel"
              description={`${dashboardData.services.hotel.current} huéspedes actuales`}
              value={dashboardData.services.hotel.checkingIn}
              valueBg="bg-green-500 text-neutral-200"
              valueLabel="entrando hoy"
            />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">
                  {dashboardData.services.activities.grooming}
                </p>
                <p className="text-xs text-gray-600">Peluquería</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">
                  {dashboardData.services.activities.training}
                </p>
                <p className="text-xs text-gray-600">Entrenamiento</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">
                  {dashboardData.services.activities.playtime}
                </p>
                <p className="text-xs text-gray-600">Tiempo de Juego</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white  rounded-lg shadow-md p-9 col-span-2 w-full!">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Actividad Reciente
            </h3>
          </div>
          <div className="space-y-3">
            {dashboardData.recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="mt-4 pt-3 border-t">
            <button className="w-full text-[#4B9460] hover:text-[#3E7A50] transition-colors text-sm font-medium">
              Ver toda la actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

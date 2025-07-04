"use client";

import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  Users,
  Calendar,
  Activity,
  Hotel,
  Settings,
  BarChart3,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  Dog,
} from "lucide-react";
import { useState } from "react";
import { useSession } from "@/hooks/useSession";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/negocio/dashboard/inicio",
  },
  {
    title: "Alumnos",
    icon: Dog,
    path: "/negocio/dashboard/mascotas",
  },
  {
    title: "Reservas",
    icon: Calendar,
    path: "/negocio/dashboard/reservas",
  },
  {
    title: "Servicios",
    icon: Activity,
    path: "/negocio/dashboard/servicios",
  },
  {
    title: "Hotel",
    icon: Hotel,
    path: "/negocio/dashboard/hotel",
  },
  {
    title: "Reportes",
    icon: BarChart3,
    path: "/negocio/dashboard/reportes",
  },
  {
    title: "Facturas",
    icon: FileText,
    path: "/negocio/dashboard/facturas",
  },
];

const bottomMenuItems = [
  {
    title: "Notificaciones",
    icon: Bell,
    path: "/dashboard/notificaciones",
  },
  {
    title: "Configuración",
    icon: Settings,
    path: "/dashboard/configuracion",
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useSession();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4B9460] rounded-lg flex items-center justify-center">
            <span className="text-neutral-200 font-bold text-sm">D</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-gray-900">DogApp</h1>
              <p className="text-xs text-gray-500">Gestión Canina</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-[#4B9460] text-neutral-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.title}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Menu Items */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? "bg-[#4B9460] text-neutral-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="mb-3">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {user?.name || "Usuario"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:hidden absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 z-10"
        >
          <Menu className="w-3 h-3 text-gray-600" />
        </button>

        <SidebarContent />
      </div>
    </>
  );
}

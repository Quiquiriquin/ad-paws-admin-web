import { AuthProvider } from "@/context/AuthContext";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/negocio")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

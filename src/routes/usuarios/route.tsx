import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/usuarios")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-gradient-to-br from-forest-50 to-forest-200 p-4 overflow-auto">
      <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <Outlet />
      </div>
    </div>
  );
}

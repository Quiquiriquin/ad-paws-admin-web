import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(complete)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-dvh flex items-center justify-center bg-[#1c4f4a]">
      <Outlet />
    </div>
  );
}

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/negocio/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-dvh grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex flex-col items-center lg:pr-16 justify-center text-neutral-200">
        <img src="/login-img-2.png" alt="Login image" />
      </div>
      <div className="flex flex-col justify-center sm:items-center md:items-start px-8 lg:pl-16 bg-[#1c4f4a] ">
        <Outlet />
      </div>
    </div>
  );
}

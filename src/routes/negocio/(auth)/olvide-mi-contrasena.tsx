import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/negocio/(auth)/olvide-mi-contrasena")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/olvide-mi-contrasena"!</div>;
}

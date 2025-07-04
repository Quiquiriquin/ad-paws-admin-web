import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/usuarios/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/usuarios/dashboard"!</div>;
}

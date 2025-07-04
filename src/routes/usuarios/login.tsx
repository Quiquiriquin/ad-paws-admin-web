import LoginForm from "@/components/Forms/LoginForm";
import { createFileRoute } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";

export const Route = createFileRoute("/usuarios/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const methods = useForm({
    mode: "all",
  });
  const onFormSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    // Aquí puedes manejar el inicio de sesión, por ejemplo, llamando a un servicio de autenticación
  };
  return (
    <div className="bg-white dark:bg-gray-800! shadow-lg p-12 rounded-lg max-w-[540px] mx-auto">
      <div className="mb-6">
        <h1 className="text-[#212121] dark:text-neutral-200 text-xl font-bold leading-[1.8]">
          ¡Bienvenido de nuevo!
        </h1>
        <h3 className="text-[#212121] dark:text-neutral-200 text-sm">
          Ingresa tus credenciales para acceder a tu cuenta.
        </h3>
      </div>
      <FormProvider {...methods}>
        <LoginForm onFormSubmit={onFormSubmit} client />
      </FormProvider>
    </div>
  );
}

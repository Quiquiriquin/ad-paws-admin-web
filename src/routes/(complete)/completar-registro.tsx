import CompleteProfileForm, {
  type CompleteProfileFormDataValues,
} from "@/components/Forms/CompleteProfileForm";
import Label from "@/components/ui/Label";
import AnimatedImages from "@/components/ui/People";
import { useSession } from "@/hooks/useSession";
import { UPDATE_USER } from "@/lib/mutations/user.mutations";
import { useMutation } from "@apollo/client";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const Route = createFileRoute("/(complete)/completar-registro")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<CompleteProfileFormDataValues>({
    mode: "all",
  });
  const router = useRouter();
  const { setUser } = useSession();
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  const onSubmit = async (data: CompleteProfileFormDataValues) => {
    console.log("Form submitted with data:", data);
    await updateUser({
      variables: {
        input: data,
      },
    });
  };

  useEffect(() => {
    if (data && data.updateUser) {
      setUser(data.updateUser);
      router.navigate({ to: "/dashboard" });
    }
  }, [data]);

  return (
    <div className="grid grid-cols-[200px_auto] gap-6 rounded-lg bg-white dark:bg-gray-800 p-8">
      <AnimatedImages />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full">
          <Label className="text-left block text-2xl font-bold">
            ¡Hola de nuevo!
          </Label>
          <Label className="mt-2 text-left block text-small">
            Antes de continuar, necesitamos saber <br></br> un poco más de ti.
          </Label>
        </div>
        <div className="mt-6 w-full">
          <FormProvider {...form}>
            <CompleteProfileForm loading={loading} onSubmit={onSubmit} />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

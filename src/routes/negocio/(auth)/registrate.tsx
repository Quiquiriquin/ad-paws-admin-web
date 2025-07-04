import SignupForm from "@/components/Forms/SignupForm";
import { useSession } from "@/hooks/useSession";
import { CREATE_USER } from "@/lib/mutations/user.mutations";
import { useMutation } from "@apollo/client";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/negocio/(auth)/registrate")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useSession();
  const [createUser, { loading, data }] = useMutation(CREATE_USER);
  const form = useForm<FieldValues>({
    mode: "all",
  });
  const { t } = useTranslation();
  const handleSubmit = (data: FieldValues) => {
    if (data.password === data.confirmPassword) {
      delete data.confirmPassword;
      createUser({
        variables: {
          input: data,
        },
      });
    }
  };

  useEffect(() => {
    if (data && data.createUser) {
      const { email, password } = form.getValues();
      login(email, password);
    }
  }, [data]);

  return (
    <>
      <div className="mb-4">
        <label className="block text-3xl font-bold text-light tracking-wide text-center md:text-left">
          {t("sign-up-title")}
        </label>
        <label className="text-light text-sm">{t("sign-up-subtitle")}</label>
      </div>
      <div className="flex flex-col gap-4 sm:w-1/2 lg:max-w-2/3">
        <FormProvider {...form}>
          <SignupForm onSubmit={handleSubmit} loading={loading} />
        </FormProvider>
      </div>
    </>
  );
}

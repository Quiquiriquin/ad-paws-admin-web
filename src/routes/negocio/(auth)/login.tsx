import { createFileRoute, Link } from "@tanstack/react-router";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import LoginForm, {
  type LoginFormDataValues,
} from "@/components/Forms/LoginForm";
import { useTranslation } from "react-i18next";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/negocio/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login } = useSession();
  const { t } = useTranslation();
  const form = useForm<LoginFormDataValues>({
    mode: "all",
  });
  const onFormSubmit = (data: FieldValues) => {
    console.log("DATA", data);
    login(data.email, data.password);
  };
  return (
    <>
      <label className="block text-3xl font-bold text-light mb-4 tracking-wide text-center md:text-left">
        {t("sign-in-title")}
      </label>
      <div className="flex flex-col gap-4 sm:w-1/2 lg:max-w-2/3">
        <FormProvider {...form}>
          <LoginForm onFormSubmit={onFormSubmit} />
        </FormProvider>
        <Link to="/negocio/registrate">
          <label className="text-center inline-block text-xs underline decoration-solid text-light mt-0 cursor-pointer">
            {t("do-you-have-account")}
          </label>
        </Link>
      </div>
    </>
  );
}

import { useFormContext, type FieldValues } from "react-hook-form";
import FormInput from "../ui/FormInput";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useSession } from "@/hooks/useSession";

interface LoginFormProps {
  client?: boolean;
  onFormSubmit: (data: FieldValues) => void; // Replace 'any' with the specific type of your form data if known
}

export type LoginFormDataValues = {
  email: string;
  password: string;
};

const LoginForm = ({ onFormSubmit, client = false }: LoginFormProps) => {
  const { loading } = useSession();
  const { handleSubmit } = useFormContext();
  const { t } = useTranslation();

  return (
    <form
      className="mx-auto sm:w-full md:mx-0"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <FormInput
        classToForce={!client ? "text-neutral-200" : ""}
        name="email"
        label={t("email")}
        placeholder={t("email-placeholder")}
      />
      <FormInput
        name="password"
        classToForce={!client ? "text-neutral-200" : ""}
        label={t("password")}
        type="password"
        placeholder={t("password-placeholder")}
      />
      <Link to="/negocio/olvide-mi-contrasena">
        <label className="text-xs text-light underline decoration-solid cursor-pointer">
          ¿Olvidaste tu contraseña?
        </label>
      </Link>
      <Button
        htmlType="submit"
        className="mt-3 w-full"
        size="large"
        type="primary"
        loading={loading}
      >
        {t("sign-in-action-button")}
      </Button>
    </form>
  );
};

export default LoginForm;

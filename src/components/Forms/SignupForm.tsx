import { useTranslation } from "react-i18next";
import FormInput from "../ui/FormInput";
import { Button } from "antd";
import { useFormContext } from "react-hook-form";

const SignupForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (data: any) => void;
  loading?: boolean;
}) => {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext();
  const { t } = useTranslation();
  const formRules = {
    email: {
      required: t("email-required"),
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: t("email-invalid"),
      },
    },
    password: {
      required: t("password-required"),
    },
    confirmPassword: {
      required: t("confirm-password-required"),
    },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto sm:w-full md:mx-0"
    >
      <FormInput
        classToForce="text-light"
        rules={formRules.email}
        name="email"
        label={t("email")}
        placeholder={t("email-placeholder")}
      />
      <FormInput
        classToForce="text-light"
        rules={formRules.password}
        name="password"
        label={t("password-signup")}
        type="password"
        placeholder={t("password-placeholder")}
      />
      <FormInput
        classToForce="text-light"
        rules={formRules.confirmPassword}
        name="confirmPassword"
        label={t("confirm-password")}
        type="password"
        placeholder={t("confirm-password-placeholder")}
      />
      <Button
        htmlType="submit"
        className="mt-3 w-full"
        size="large"
        type="primary"
        disabled={!isValid}
        style={{
          background: "#4B9460",
        }}
        loading={loading}
      >
        {t("sign-up-action-button")}
      </Button>
    </form>
  );
};

export default SignupForm;

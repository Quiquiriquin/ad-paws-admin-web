import { useTranslation } from "react-i18next";
import FormInput from "../ui/FormInput";
import { Button } from "antd";
import { useFormContext } from "react-hook-form";
import PhoneInput from "../ui/PhoneFormInput";
import FormSelect from "../ui/FormSelect";

export type CompleteProfileFormDataValues = {
  name: string;
  lastname: string;
  gender: string;
  phone?: string;
};

const CompleteProfileForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (data: any) => void;
  loading?: boolean;
}) => {
  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useFormContext();
  const { t } = useTranslation();
  const formRules = {
    name: {
      required: t("name-required"),
    },
    lastname: {
      required: t("lastname-required"),
    },
    gender: {
      required: t("gender-required"),
    },
  };

  const genderOptions = [
    { value: "Male", label: t("male") },
    { value: "Female", label: t("female") },
    { value: "Other", label: t("other") },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto sm:w-full md:mx-0"
    >
      <FormInput
        rules={formRules.name}
        name="name"
        label={t("name")}
        placeholder={t("name-placeholder")}
      />
      <FormInput
        rules={formRules.lastname}
        name="lastname"
        label={t("lastname")}
        placeholder={t("lastname-placeholder")}
      />
      <FormSelect
        rules={formRules.gender}
        name="gender"
        label={t("gender")}
        placeholder={t("gender-placeholder")}
        options={genderOptions}
      />
      <PhoneInput
        name="phone"
        label={t("phone")}
        placeholder={t("phone-placeholder")}
        defaultCountryCode="+52" // Default to Spain
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
        {t("continue")}
      </Button>
    </form>
  );
};

export default CompleteProfileForm;

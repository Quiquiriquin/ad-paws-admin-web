import { FormProvider, useForm } from "react-hook-form";
import RegistrationForm from "../Forms/RegistrationForm";
import { updateStep } from "@/routes/usuarios/registro";
import { useStateMachine } from "little-state-machine";
import { useEffect } from "react";

const updateUser = (state: any, payload: any) => {
  return {
    ...state,
    user: {
      ...state.user,
      ...payload,
    },
  };
};

const UserStep = () => {
  const { actions, state }: any = useStateMachine({
    actions: { updateUser, updateStep },
  });
  const methods = useForm({
    mode: "all",
  });
  const userToSave = (data: any) => {
    actions.updateUser(data);
    actions.updateStep({ step: state?.step + 1 });
  };

  useEffect(() => {
    if (state?.step === 1) {
      console.log("Resetting dog form for step 1");
      methods.reset(state?.user || {});
    }
  }, [state?.step]);

  return (
    <FormProvider {...methods}>
      <RegistrationForm onSubmit={userToSave} />
    </FormProvider>
  );
};

export default UserStep;

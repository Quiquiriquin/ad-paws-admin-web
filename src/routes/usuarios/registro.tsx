import { createFileRoute } from "@tanstack/react-router";
import { createStore, useStateMachine } from "little-state-machine";
import RoundedStepper from "@/components/ui/RoundedStepper";
import { HeaderLabels } from "@/components/registro/HeaderLabels";
import UserStep from "@/components/registro/UserStep";
import DogStep from "@/components/registro/DogStep";
import ReviewStep from "@/components/registro/ReviewStep";

export const Route = createFileRoute("/usuarios/registro")({
  component: RouteComponent,
});

const storeLogger = (state: any) => {
  console.log("Current State:", state);
  return state;
};

createStore(
  {
    user: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    step: 1,
    dogs: [
      {
        name: "",
        breed: "",
        size: "",
        color: "",
        age: "",
        weight: "",
      },
    ],
  },
  {
    middleWares: [storeLogger],
  }
);

export const updateStep = (state: any, payload: any) => {
  return {
    ...state,
    step: payload.step,
  };
};

function RouteComponent() {
  const { state }: any = useStateMachine();

  return (
    <div className="bg-neutral-50 p-4 py-6 md:p-8 shadow-lg rounded-lg w-full max-w-full mx-auto overflow-auto flex flex-col justify-center h-full md:h-auto md:max-w-[512px] lg:max-w-[600px]">
      <HeaderLabels step={state?.step} />
      <RoundedStepper howManySteps={3} stepActive={state?.step} />
      <div className="mt-6 md:mt-8">
        {state?.step === 1 && <UserStep />}
        {state?.step === 2 && <DogStep />}
        {state?.step === 3 && <ReviewStep />}
      </div>
    </div>
  );
}

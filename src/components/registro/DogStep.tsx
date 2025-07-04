import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";
import DogAvatarList from "../ui/DogAvatarList";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import DogForm from "../Forms/DogForm";
import Label from "../ui/Label";
import { updateStep } from "@/routes/usuarios/registro";

const emptyDog = {
  name: "",
  breed: "",
  size: "",
  color: "",
  age: "",
  weight: "",
};

const updateDogs = (state: any, payload: any) => {
  return {
    ...state,
    dogs: payload,
  };
};

const DogStep = () => {
  const { actions, state }: any = useStateMachine({
    actions: { updateStep, updateDogs },
  });
  const [activeDog, setActiveDog] = useState(state?.dogs?.length - 1 || 0);
  const dogFormMethods = useForm({
    mode: "all",
  });
  const addDog = (data: any) => () => {
    if (activeDog === 0 && state?.dogs.length === 1) {
      actions.updateDogs([data, emptyDog]);
      setActiveDog(activeDog + 1);
    } else if (activeDog === state?.dogs.length - 1 && data?.name) {
      const updatedDogs = [...state?.dogs, emptyDog];
      updatedDogs[activeDog] = data;
      actions.updateDogs(updatedDogs);
      setActiveDog(updatedDogs.length - 1);
    } else {
      const updatedDogs = [...state?.dogs];
      updatedDogs[activeDog] = data;
      actions.updateDogs(updatedDogs);
    }

    resetDogForm();
  };

  const onDogSelect = async (dog: any, index: number) => {
    addDog(dogFormMethods.getValues())();
    setActiveDog(index);
    resetDogForm(dog);
  };

  const resetDogForm = (dog?: any) => {
    dogFormMethods.reset({
      name: dog?.name || "",
      breed: dog?.breed || "",
      size: dog?.size || "",
      color: dog?.color || "",
      age: dog?.age || "",
      weight: dog?.weight || "",
    });
  };

  const deleteDog = (index: number) => {
    const updatedDogs = [...state?.dogs];
    updatedDogs.splice(index, 1);
    actions.updateDogs(updatedDogs);
    if (activeDog >= updatedDogs.length) {
      setActiveDog(updatedDogs.length - 1);
    }
    resetDogForm(updatedDogs[activeDog] || emptyDog);
  };

  useEffect(() => {
    if (state?.step === 2) {
      resetDogForm(state?.dogs?.[activeDog] || emptyDog);
    }
  }, [state?.step]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-row gap-4 mb-4 md:mb-6">
        <div className="flex gap-3 min-w-max sm:min-w-0">
          <DogAvatarList
            onDeleteDog={deleteDog}
            dogs={state?.dogs}
            activeDogName={dogFormMethods.watch("name")}
            activeDog={activeDog}
            onDogSelect={onDogSelect}
          />
        </div>

        <div className="">
          <Button
            onClick={addDog(dogFormMethods.getValues())}
            type="dashed"
            icon={<PlusOutlined />}
            size={"large"}
            shape="circle"
            className="flex-shrink-0"
          />
        </div>
      </div>

      <div className="border border-forest-200 rounded-lg p-4 md:p-6 bg-forest-200/30">
        <Label className="text-base md:text-lg font-bold mb-3 md:mb-4 block">
          {`Información de ${dogFormMethods.watch("name") || "tu peludo"}`}
        </Label>
        <FormProvider {...dogFormMethods}>
          <DogForm onSubmit={addDog} />
        </FormProvider>
      </div>

      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
        <Button
          size="large"
          variant="outlined"
          className="w-full order-2 sm:order-1"
          onClick={() => {
            actions.updateStep({ step: 1 });
          }}
        >
          Regresar
        </Button>
        <Button
          size="large"
          type="primary"
          className="w-full order-1 sm:order-2"
          onClick={() => {
            addDog(dogFormMethods.getValues())();
            actions.updateStep({ step: 3 });
          }}
        >
          Revisar información
        </Button>
      </div>
    </div>
  );
};

export default DogStep;

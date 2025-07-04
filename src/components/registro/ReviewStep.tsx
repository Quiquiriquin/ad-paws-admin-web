import { useStateMachine } from "little-state-machine";
import { useCallback, useEffect, useState } from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import DisplayInformation from "../ui/DisplayInformation";
import { singularOrPlural } from "@/lib/utils";
import { dogSizes } from "@/utils/size.catalog";
import { dogBreeds } from "@/utils/breed.catalog";
import { Button } from "antd";
import { updateStep } from "@/routes/usuarios/registro";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/lib/mutations/user.mutations";
import { CREATE_DOGS } from "@/lib/mutations/dog.mutations";
import { useRouter } from "@tanstack/react-router";
const ReviewStep = () => {
  const router = useRouter();
  const [registerMutation, { loading, error, data }] = useMutation(CREATE_USER);
  const [dogsMutation, { loading: dogsLoading, data: dogsData }] =
    useMutation(CREATE_DOGS);
  const { actions, state }: any = useStateMachine({
    actions: { updateStep },
  });
  const { user } = state;
  const [validDogs, setValidDogs] = useState<
    { name: any; breed: any; size: any; color: any; age: any; weight: any }[]
  >([]);

  const cleanupDogs = (dogsToValid: any[]) => {
    return dogsToValid
      .filter((dog) => !!dog?.name)
      .map((dog) => {
        return {
          name: dog.name || "Sin nombre",
          breed: dog.breed || "Desconocida",
          size: dog.size || "Desconocido",
          color: dog.color || "Desconocido",
          age: dog.age || "Desconocida",
          weight: dog.weight || "Desconocido",
        };
      });
  };

  const userInformation = useCallback(
    () => (
      <div className="border border-forest-200 rounded-lg p-4 md:p-6 bg-forest-200/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
          <DisplayInformation
            text={`${user?.name} ${user?.lastname}`}
            label="Nombre"
          />
          <DisplayInformation
            text={user?.email || "Sin correo electrónico"}
            label="Correo electrónico"
          />
          <DisplayInformation
            text={user?.phone || "Sin teléfono"}
            label="Telefono"
          />
        </div>
      </div>
    ),
    [user]
  );

  const renderDogsInformation = useCallback(() => {
    return validDogs.map((dog, index) => (
      <div
        key={index}
        className="border border-forest-200 rounded-lg p-4 md:p-6 bg-forest-200/30 mb-4"
      >
        <h4 className="font-semi-bold mb-2">
          Información de <b>{dog.name || "tu peludo"}</b>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
          <DisplayInformation
            text={dogBreeds[dog.breed as keyof typeof dogBreeds] || dog.breed}
            label="Raza"
          />
          <DisplayInformation
            text={dogSizes[dog.size as keyof typeof dogSizes] || dog.size}
            label="Tamaño"
          />
          <DisplayInformation text={dog.color} label="Color" />
          <DisplayInformation
            text={singularOrPlural(dog.age, "año", "años")}
            label="Edad"
          />
          <DisplayInformation text={`${dog.weight} kg`} label="Peso" />
        </div>
      </div>
    ));
  }, [validDogs]);

  const finishRegistration = async () => {
    const userData = {
      ...user,
      role: "CLIENT",
    };
    await registerMutation({
      variables: {
        input: userData,
      },
    });
  };

  const createDogs = () => {
    const dogsInput = [
      ...validDogs.map((dog) => ({
        ...dog,
        age: parseInt(dog.age, 10),
        weight: parseFloat(dog.weight),
        ownerId: parseInt(data?.createUser?.id, 10) || 0,
      })),
    ];
    dogsMutation({
      variables: {
        input: {
          dogs: dogsInput,
        },
      },
    });
  };

  useEffect(() => {
    if (state?.dogs?.length > 0) {
      setValidDogs(() => [...cleanupDogs(state?.dogs)]);
    }
  }, []);

  useEffect(() => {
    if (data) {
      createDogs();
    }
  }, [data]);

  useEffect(() => {
    if (dogsData) {
      console.log("Dogs created successfully:", dogsData.craeteDogs);
      router.navigate({
        to: "/usuarios/dashboard",
      });
    }
  }, [dogsData]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center mb-3 gap-2">
          <h4 className="font-semi-bold pl-4 md:pl-6">Tu información</h4>
          <EditOutlined onClick={() => actions.updateStep({ step: 1 })} />
        </div>
        {userInformation()}
      </div>

      <div>
        <div className="flex items-center mb-3 gap-2">
          <h4 className="font-semi-bold pl-4 md:pl-6">Tu peludos</h4>
          <EditOutlined onClick={() => actions.updateStep({ step: 2 })} />
        </div>
        {renderDogsInformation()}
      </div>
      <div className="">
        <Button
          onClick={finishRegistration}
          type="primary"
          size="large"
          className="w-full"
          variant="solid"
        >
          Finalizar registro
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;

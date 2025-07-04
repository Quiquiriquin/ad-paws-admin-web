import type React from "react";
import { useState } from "react";
import { Button } from "antd";
import { CheckCircle } from "lucide-react";
import { CheckInModal, type CheckInFormData } from "@/components/CheckIn";
// Importa tu mutación de GraphQL aquí si la tienes
// import { CHECK_IN_DOG } from "@/lib/mutations/dog.mutations";

interface QuickCheckInButtonProps {
  className?: string;
}

const QuickCheckInButton: React.FC<QuickCheckInButtonProps> = ({
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ejemplo de mutación - reemplaza con tu implementación real
  // const [checkInDog, { loading }] = useMutation(CHECK_IN_DOG);

  // Mock data - reemplaza con datos reales de tu aplicación
  const mockAvailableDogs = [
    {
      id: 1,
      name: "Max",
      breed: "Labrador",
      age: 3,
      size: "MEDIUM",
      ownerId: 1,
      owner: {
        id: 1,
        name: "Juan",
        lastname: "Pérez",
        email: "juan@example.com",
        phone: "+52 1234567890",
        gender: "Male",
        howManyDogs: 2,
      },
      imageUrl: "/placeholder.svg?height=100&width=100",
      notes: "Es muy juguetón",
      status: "active",
    },
    {
      id: 2,
      name: "Luna",
      breed: "Beagle",
      age: 2,
      size: "SMALL",
      ownerId: 2,
      owner: {
        id: 2,
        name: "María",
        lastname: "González",
        email: "maria@example.com",
        phone: "+52 0987654321",
        gender: "Female",
        howManyDogs: 1,
      },
      imageUrl: "/placeholder.svg?height=100&width=100",
      notes: "Necesita medicación diaria",
      status: "active",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: CheckInFormData) => {
    console.log("Check-in data:", data);

    // Implementa la lógica para enviar los datos al servidor
    // Ejemplo:
    // try {
    //   await checkInDog({
    //     variables: {
    //       input: {
    //         dogId: data.dogId,
    //         service: data.service,
    //         itemsLeft: Object.keys(data.itemsLeft).filter(key => data.itemsLeft[key as keyof typeof data.itemsLeft]),
    //         extraServices: Object.keys(data.extraServices).filter(key => data.extraServices[key as keyof typeof data.extraServices]),
    //         notes: data.notes
    //       }
    //     }
    //   });
    // } catch (error) {
    //   console.error("Error during check-in:", error);
    // }
  };

  return (
    <>
      <Button
        size="large"
        type="primary"
        icon={<CheckCircle className="w-4 h-4" />}
        onClick={handleOpenModal}
        className={className}
        style={{ backgroundColor: "#4B9460" }}
      >
        Check-in Rápido
      </Button>

      <CheckInModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        availableDogs={mockAvailableDogs}
      />
    </>
  );
};

export default QuickCheckInButton;

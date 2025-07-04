import { Card, Avatar, Tag, Button, Badge, Typography, Space } from "antd";
import { EyeOutlined, MoreOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  size: "SMALL" | "MEDIUM" | "LARGE";
  ownerId: number;
  owner: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string;
    howManyDogs: number;
  };
  imageUrl: string;
  notes: string;
  status: "active" | "inactive";
}

interface PetCardProps {
  pet: Pet;
  onViewDetails: (petId: number) => void;
  onMoreActions?: (petId: number) => void;
}

export default function PetCard({
  pet,
  onViewDetails,
  onMoreActions,
}: PetCardProps) {
  const statusConfig = {
    active: { color: "success" },
    inactive: { color: "default" },
  };

  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      Guardería: "blue",
      Peluquería: "purple",
      Hotel: "orange",
      Entrenamiento: "green",
      "Tiempo de Juego": "cyan",
    };
    return tagColors[tag] || "default";
  };

  return (
    <Card
      className="h-full"
      style={{ backgroundColor: "#fff" }}
      styles={{
        body: {
          padding: "16px",
          height: "100%",
        },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header with pet info, status and more actions */}
        <div className="flex items-start justify-between mb-4">
          <Space align="start" size={12}>
            <Badge
              dot
              status={pet.status === "active" ? "success" : "default"}
              styles={{
                indicator: {
                  width: "16px",
                  height: "16px",
                },
              }}
            >
              <Avatar
                size={64}
                src={pet.imageUrl}
                alt={pet.name}
                style={{ backgroundColor: "#f0f0f0" }}
                shape="square"
              >
                {pet.name.charAt(0)}
              </Avatar>
            </Badge>

            <div>
              <Title level={4} style={{ margin: 0, fontSize: "18px" }}>
                {pet.name}
              </Title>
              <Text type="secondary">{pet.breed}</Text>
            </div>
          </Space>
          <div className="flex items-center gap-2">
            {onMoreActions && (
              <Button
                type="text"
                size="small"
                icon={<MoreOutlined />}
                onClick={() => onMoreActions(pet.id)}
              />
            )}
          </div>
        </div>

        {/* Pet details */}
        <div className="flex-1 space-y-2">
          <div>
            <Text strong>Dueño: </Text>
            <Text>
              {pet.owner.name} {pet.owner.lastname}
            </Text>
          </div>
          <div>
            <Text strong>Edad: </Text>
            <Text>{pet.age} años</Text>
          </div>

          {/* Service tags */}
          {/* <div className="mt-3">
            <Space size={[4, 4]} wrap>
              {pet.tags.map((tag, index) => (
                <Tag key={index} color={getTagColor(tag)} style={{ margin: 0 }}>
                  {tag}
                </Tag>
              ))}
            </Space>
          </div> */}
        </div>

        {/* Action button at bottom */}
        <div className="mt-4">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => onViewDetails(pet.id)}
            block
          >
            Ver detalles
          </Button>
        </div>
      </div>
    </Card>
  );
}

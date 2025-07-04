import { Avatar, Tag, Button, Typography, Space, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { Pet } from "./PetCard";

const { Text } = Typography;

interface PetListItemProps {
  pet: Pet;
  onViewDetails: (petId: number) => void;
  onMoreActions?: (petId: number) => void;
}

export default function PetListItem({
  pet,
  onViewDetails,
  onMoreActions,
}: PetListItemProps) {
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
    <tr className="hover:bg-gray-50">
      {/* Pet Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Space align="center" size={12}>
          <Avatar
            size={40}
            src={pet.imageUrl}
            alt={pet.name}
            style={{ backgroundColor: "#f0f0f0" }}
          >
            {pet.name.charAt(0)}
          </Avatar>
          <div>
            <Text strong style={{ display: "block" }}>
              {pet.name}
            </Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {pet.breed} • {pet.age}
            </Text>
          </div>
        </Space>
      </td>

      {/* Owner Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <Text style={{ display: "block" }}>{pet.owner}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {pet.ownerPhone}
          </Text>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Space align="center" size={4}>
          {pet.status === "active" ? (
            <CheckCircleOutlined style={{ color: "#52c41a" }} />
          ) : (
            <ExclamationCircleOutlined style={{ color: "#8c8c8c" }} />
          )}
          <Text>{pet.status === "active" ? "Activo" : "Inactivo"}</Text>
        </Space>
      </td>

      {/* Services */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Space size={[4, 4]} wrap>
          {pet.tags.map((tag, index) => (
            <Tag key={index} color={getTagColor(tag)} style={{ margin: 0 }}>
              {tag}
            </Tag>
          ))}
        </Space>
      </td>

      {/* Next Visit */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Text type="secondary">{pet.nextVisit}</Text>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Space size={8}>
          <Tooltip title="Ver detalles">
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => onViewDetails(pet.id)}
            >
              Ver
            </Button>
          </Tooltip>
          {onMoreActions && (
            <Tooltip title="Más acciones">
              <Button
                type="text"
                size="small"
                icon={<MoreOutlined />}
                onClick={() => onMoreActions(pet.id)}
              />
            </Tooltip>
          )}
        </Space>
      </td>
    </tr>
  );
}

"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
  Typography,
  Row,
  Col,
  Empty,
  Segmented,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
  AppstoreOutlined,
  BarsOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import PetCard, { type Pet } from "@/components/ui/PetCard";
import PetListItem from "@/components/ui/PetListItem";
import { useLazyQuery, useQuery } from "@apollo/client";
import { COMPANY_ALUMNI } from "@/lib/queries/dog.queries";

const { Title, Text } = Typography;
const { Option } = Select;

export const Route = createFileRoute("/negocio/dashboard/mascotas")({
  component: MascotasComponent,
});

function MascotasComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const [getAlumni, { data: petsData, error, loading }] = useLazyQuery(
    COMPANY_ALUMNI,
    {
      variables: { companyId: 1, search: searchTerm }, // Replace with actual company ID
    }
  );

  // Filter pets based on search term and status
  // const filteredPets = mockPets.filter((pet: any) => {
  //   const matchesSearch =
  //     pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     pet.owner.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesStatus = statusFilter === "all" || pet.status === statusFilter;

  //   return matchesSearch && matchesStatus;
  // });
  const filteredPets = [];

  const handleViewDetails = (petId: number) => {
    console.log("View details for pet:", petId);
    // Navigate to pet details or open modal
  };

  const handleMoreActions = (petId: number) => {
    console.log("More actions for pet:", petId);
    // Show dropdown menu with actions
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("Debounced search term:", searchTerm);
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Llama a `getAlumni` solo cuando el valor debounced cambia
  useEffect(() => {
    console.log("Fetching alumni with search term:", debouncedSearch);
    getAlumni({
      variables: {
        companyId: 1,
        search: debouncedSearch,
      },
    });
  }, [debouncedSearch]);

  useEffect(() => {
    getAlumni();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={16}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Alumnos
            </Title>
            <Text type="secondary">
              Gestiona los alumnos registrados en tu negocio
            </Text>
          </div>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#4B9460", borderColor: "#4B9460" }}
          >
            Nuevo alumno
          </Button>
        </Col>
      </Row>

      {/* Search and filters - Unwrapped from Card */}
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={12} lg={8}>
          <Input
            placeholder="Buscar por nombre, raza o dueño..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </Col>

        <Col xs={24} md={12} lg={16}>
          <Row justify="end" gutter={[8, 8]} align="middle">
            <Col>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 120 }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Todos</Option>
                <Option value="active">Activos</Option>
                <Option value="inactive">Inactivos</Option>
              </Select>
            </Col>

            <Col>
              <Segmented
                value={viewMode}
                onChange={(value) => setViewMode(value as "grid" | "list")}
                options={[
                  { label: <AppstoreOutlined />, value: "grid" },
                  { label: <BarsOutlined />, value: "list" },
                ]}
              />
            </Col>

            <Col>
              <Button icon={<DownloadOutlined />}>Exportar</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Pet count */}
      <Text type="secondary">
        Mostrando {filteredPets.length} de {filteredPets.length} mascotas
      </Text>

      {/* Pets Grid/List View */}
      {petsData?.companyDogs?.length > 0 ? (
        viewMode === "grid" ? (
          <Row gutter={[16, 16]}>
            {petsData?.companyDogs?.map((pet: any) => (
              <Col key={pet.id} xs={24} sm={12} lg={8} xl={6}>
                <PetCard
                  pet={pet}
                  onViewDetails={handleViewDetails}
                  onMoreActions={handleMoreActions}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mascota
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dueño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicios
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Próxima Visita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {petsData?.companyDogs?.map((pet: any) => (
                  <PetListItem
                    key={pet.id}
                    pet={pet}
                    onViewDetails={handleViewDetails}
                    onMoreActions={handleMoreActions}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <Empty
            image={<HeartOutlined style={{ fontSize: 64, color: "#d9d9d9" }} />}
            description={
              <div>
                <Title level={4}>No se encontraron mascotas</Title>
                <Text type="secondary">
                  No hay mascotas que coincidan con tu búsqueda. Intenta con
                  otros términos o registra una nueva mascota.
                </Text>
              </div>
            }
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#4B9460", borderColor: "#4B9460" }}
            >
              Registrar Mascota
            </Button>
          </Empty>
        </div>
      )}
    </div>
  );
}

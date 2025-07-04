"use client";

import type React from "react";
import { useState } from "react";
import { Checkbox, Input, Row, Col } from "antd";
import { useFormContext } from "react-hook-form";
import "../../styles/checkbox.css"; // Assuming you have a CSS file for styles

const CheckInItemsList: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const itemsLeft = watch("itemsLeft");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleItemChange = (item: string, checked: boolean) => {
    setValue(`itemsLeft.${item}`, checked);

    if (item === "otro") {
      setShowOtherInput(checked);
      if (!checked) {
        setValue("itemsLeft.otroDescripcion", "");
      }
    }
  };

  const handleOtroDescripcionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("itemsLeft.otroDescripcion", e.target.value);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Checkbox
            className="large-checkbox"
            checked={itemsLeft.correa}
            onChange={(e) => handleItemChange("correa", e.target.checked)}
          >
            Correa
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={itemsLeft.collar}
            className="large-checkbox"
            onChange={(e) => handleItemChange("collar", e.target.checked)}
          >
            Collar
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={itemsLeft.cama}
            className="large-checkbox"
            onChange={(e) => handleItemChange("cama", e.target.checked)}
          >
            Cama
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={itemsLeft.juguetes}
            className="large-checkbox"
            onChange={(e) => handleItemChange("juguetes", e.target.checked)}
          >
            Juguetes
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={itemsLeft.comida}
            className="large-checkbox"
            onChange={(e) => handleItemChange("comida", e.target.checked)}
          >
            Comida
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={itemsLeft.medicamentos}
            className="large-checkbox"
            onChange={(e) => handleItemChange("medicamentos", e.target.checked)}
          >
            Medicamentos
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={itemsLeft.plato}
            className="large-checkbox"
            onChange={(e) => handleItemChange("plato", e.target.checked)}
          >
            Plato
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={itemsLeft.otro}
            className="large-checkbox"
            onChange={(e) => handleItemChange("otro", e.target.checked)}
          >
            Otro
          </Checkbox>
        </Col>
      </Row>

      {showOtherInput && (
        <div className="mt-3">
          <Input
            placeholder="Especifica otro artículo"
            value={itemsLeft.otroDescripcion || ""}
            onChange={handleOtroDescripcionChange}
          />
        </div>
      )}
    </div>
  );
};

export default CheckInItemsList;

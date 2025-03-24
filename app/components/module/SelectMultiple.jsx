import React from "react";
import { Select, Space } from "antd";
 
import IconAmeniti from "../../asset/amenities/index";
import ControlledInput from "./ControlledInput";
const SelectMultiple = ({ control, name, label, errors }) => {
  const amenities = [
    "Wifi",
    "Washer & Dryer",
    "Free parking",
    "Hot tub",
    "24/7 Security",
    "Wheelchair accessible",
    "Elevator access",
    "Gym",
    "Smart TV",
    "Coffee maker",
    "Full kitchen",
    "Swimming pool",
    "Air conditioning",
    "Outdoor grill/BBQ",
    "Microwave",
    "Fireplace",
    "Games",
    "Fan",
    "Heating",
    "Balcony/Patio",
    "Pet friendly",
  ];

  const options = amenities.map((item) => ({
    label: item,
    value: item,
    emoji: IconAmeniti[item],
  }));

  return (
    <>
      <ControlledInput
        label={<span>{label}</span>}
        name={name}
        control={control}
        errors={errors}
        render={({ field }) => (
          <Select
            status={errors?.amenities && "error"}
            {...field}
            mode="multiple"
            style={{
              width: "100%",
            }}
            placeholder="Select one or more countries"
            options={options}
            onChange={(value) => field.onChange(value)} // Update value in react-hook-form
            optionLabelProp="label"
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.label}
              </Space>
            )}
          />
        )}
      />
    </>
  );
};

export default SelectMultiple;

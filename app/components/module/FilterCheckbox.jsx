"use client"
import React, { useState } from "react";
import { Checkbox, Flex } from "antd";

import amenitiesIcons  from "@/app/asset/amenities/index" 
const FilterCheckbox = ({ amenities, setAmenities }) => {
  const [showMore, setShowMore] = useState(false);
  const amenitiesOptions = [
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

  const options = amenitiesOptions.map((item) => ({
    label: item,
    value: item,
 
  }));

  const optionsSlice = showMore ? options : options.slice(0, 9);

  const checkHanler = (checkedValues) => {
    setAmenities((perv) => ({ ...perv, amenities: [...checkedValues] }));
  };
  return (
    <section className="flex flex-col gap-3 border-b py-4">
      <div className="mb-4">
        <span className="font-semibold text-lg gradient_title">Amineties</span>
      </div>
      <Checkbox.Group
        value={amenities}
        onChange={(checkedValues) => checkHanler(checkedValues)}
      >
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 w-full gap-y-3">
          {optionsSlice.map((item) => (
            <div key={item.label} className="w-full flex flex-col">
              <Checkbox className=" !scale-105 !text-black" value={item.value}>
              <Flex gap={2} className="items-center">
             <div className="w-[14px] mr-1">
             {amenitiesIcons[item.value]}
             </div>
              {item.label}
              </Flex>
              </Checkbox>
            </div>
          ))}
        </div>
      </Checkbox.Group>
      <button
        className="text-start w-fit p-[6px] hover:bg-blue-200/30 text-bluePrimery font-semibold rounded-lg"
        onClick={() => setShowMore(!showMore)}
      >
        {!showMore ? "Show more" : "Show less"}
      </button>
    </section>
  );
};

export default FilterCheckbox;

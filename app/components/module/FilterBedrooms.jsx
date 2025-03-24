import { Button } from "antd";
import React from "react";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import beds from "@/public/svg-bedrooms.svg";
import bath from "@/public/svg-bathrooms-ruls.svg";
import sleeps from "@/public/svg-sleeps.svg"
const FilterBedrooms = ({ title, value = 1, setValue, filterKey, icon }) => {
  const icons = { bedrooms: beds, bathrooms: bath ,sleeps:sleeps};

  const incrementDecrement = (type) => {
    if (type === "increment") {
      setValue((prev) => ({ ...prev, [filterKey]: value + 1 }));
      return;
    }
    setValue((prev) => ({ ...prev, [filterKey]: value - 1 }));
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <img
          className="w-[18px]"
          src={icons?.[filterKey]?.src || icon?.src}
          alt={title}
        />
        <span className="capitalize">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          style={{ border: "1px solid #1677ff" }}
          variant="outlined"
          size="small"
          disabled={value <= 1}
          onClick={(e) => incrementDecrement("decrement")}
          className="!rounded-full !py-[4px] !px-[2px] disabled:!border-gray-200"
        >
          <HiOutlineMinusSmall className="text-lg" />
        </Button>
        <span>{value}</span>
        <Button
          style={{ border: "1px solid #1677ff" }}
          variant="outlined"
          size="small"
          onClick={(e) => incrementDecrement("increment")}
          className="!rounded-full !py-[4px] !px-[2px] disabled:!border-gray-200"
        >
          <HiOutlinePlusSmall className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default FilterBedrooms;

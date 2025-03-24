"use client";
import React, { useEffect} from "react";
import { motion } from "motion/react";
import FilterBedrooms from "../module/FilterBedrooms";
import RoomFilterBtn from "../module/RoomFilterBtn";
 
const DropDownUI = ({ 
  roomFiltersConfig, roomUiConfig 
}) => {
  const { filters, setFilters, initialFilters, hasFiltersChanged, filterHandler, clearParamHandler } = roomFiltersConfig;
  const { dropDownOpen, setDropDownOpen, dropdownRef, activeKey } =roomUiConfig ;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilters(initialFilters);
        setDropDownOpen(null);
      }
    };

    if (dropDownOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen]);

  return (
    <motion.div
      className="w-80 bg-white max-sm:hidden rounded overflow-hidden top-10 left-0 shadow-xl absolute z-30 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full flex flex-col p-4  ">
        <div className="font-semibold pb-1 capitalize mb-3 border-b ">
          {activeKey} count
        </div>
        <div className="text-base">
          <div className="flex flex-col gap-5">
            <FilterBedrooms
              title={activeKey}
              value={filters[activeKey]}
              setValue={setFilters}
              filterKey={activeKey}
            />

            <RoomFilterBtn
              value={filters[activeKey]}
              filterHandler={filterHandler}
              hasFiltersChanged={hasFiltersChanged}
              clearParamHandler={() => clearParamHandler()}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropDownUI;

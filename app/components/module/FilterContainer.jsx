"use client";

import React, { useEffect, useRef, useState } from "react";
import ModalUI from "../UI/ModalUI";
import { Badge, Button, Drawer } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { IoFilter } from "react-icons/io5";
import RoomFilter from "./RoomFilter";
import SortProperty from "./SortProperty";
import FilterContent from "./FilterContent";
const FilterContainer = () => {
  const searchParams = useSearchParams();
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
  const [dropDownOpen, setDropDownOpen] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [roomsCount, setRoomsCount] = useState({
    bedroomsCount: 1,
    bathroomsCount: 1,
    sleepsCount: 1,
  });

  const dropdownRefBed = useRef();
  const dropdownRefBath = useRef();
  const dropdownRefSleep = useRef();
  const amenitiesParams = searchParams.getAll("amenities") || [];
  const minPriceParams = Number(searchParams.get("minPrice")) || 0;
  const maxPriceParams = Number(searchParams.get("maxPrice")) || 700;
  const bedsParams = Number(searchParams.get("bedrooms")) || 1;
  const bathParams = Number(searchParams.get("bathrooms")) || 1;
  const sleepsParams = Number(searchParams.get("sleeps")) || 1;
  const typeParams = searchParams.getAll("type") || [];
  const rulesParams = searchParams.getAll("rules") || [];

  const router = useRouter();
  const [initialFilters, setInitialFilters] = useState(null);

  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    amenities: amenitiesParams,
    minPrice: minPriceParams,
    maxPrice: maxPriceParams,
    bedrooms: bedsParams,
    bathrooms: bathParams,
    sleeps: sleepsParams,
    type: typeParams,
    rules: rulesParams,
  });

  const hasFiltersChanged =
    JSON.stringify(filters) !== JSON.stringify(initialFilters);

  const activeFiltersCount =
    Object.entries(filters || {}).reduce((count, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) return count + value.length;
      if (typeof value === "number") {
        if (["bedrooms", "bathrooms", "sleeps"].includes(key) && value > 1)
          return count + 1;
      }
      return count;
    }, 0) + (filters?.minPrice > 0 || filters?.maxPrice < 700 ? 1 : 0);

 

  const filterHandler = (roomKey, roomType) => {
    const params = new URLSearchParams(searchParams);
    setRoomsCount((perv) => ({ ...perv, [roomKey]: filters[roomType] }));

    ["amenities", "type", "rules"].forEach((key) => {
      params.delete(key);
      for (let param of filters[key]) {
        params.append(key, param);
      }
    });

    const numericFilters = [
      "minPrice",
      "maxPrice",
      "bedrooms",
      "bathrooms",
      "sleeps",
    ];
    numericFilters.forEach((key) => {
      if (["minPrice", "maxPrice"].includes(key)) {
        params.delete(key);
        if (key === "minPrice" && filters[key] > 1)
          params.set(key, filters[key]);
        if (key === "maxPrice" && filters[key] < 700)
          params.set(key, filters[key]);
      } else {
        filters[key] > 1 ? params.set(key, filters[key]) : params.delete(key);
      }
    });
    if (filters.minPrice == 0 && filters.maxPrice == 700) {
      params.delete("minPrice");
      params.delete("maxPrice");
    }
    params.delete("page");
    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push("/search" + query);

    setDropDownOpen(null);
    setAppliedFiltersCount(activeFiltersCount);
    setDrawerOpen(false);
    setOpen(false);
  };

  const openModalHandler = () => {
    setInitialFilters((perv) => ({ ...perv, ...filters }));
    setOpen(true);
  };
  const closeModalHandler = () => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
    setOpen(false);
  };

  const clearAllParams = () => {
    const params = new URLSearchParams(searchParams);
    const keysToDelete = [];
    params.forEach((_, key) => {
      if (key !== "sortBy" && key !== "q") {
        keysToDelete.push(key);
      }
    });

    // Delete collected keys
    keysToDelete.forEach((key) => params.delete(key));
    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push("/search" + query);
    setFilters({
      amenities: [],
      minPrice: 0,
      maxPrice: 700,
      bedrooms: 1,
      bathrooms: 1,
      sleeps: 1,
      type: [],
      rules: [],
    });

    setAppliedFiltersCount(0);
    setOpen(false);
  };

  const hasFilterSelected =
    (filters &&
      ((filters.amenities && filters.amenities.length > 0) ||
        filters.minPrice ||
        (filters.maxPrice !== undefined &&
          filters.maxPrice < 700 &&
          filters.minPrice === 0) ||
        filters.bedrooms > 1 ||
        filters.bathrooms > 1 ||
        filters.sleeps > 1 ||
        (filters.rules && filters.rules.length > 0) ||
        (filters.type && filters.type.length > 0))) ||
    false;
  useEffect(() => {
    setInitialFilters(filters);
  }, []);

  useEffect(() => {
    setAppliedFiltersCount(activeFiltersCount);

    const filterKey = ["bedrooms", "bathrooms", "sleeps"];
    const roomKey = ["bedroomsCount", "bathroomsCount", "sleepsCount"];

    setRoomsCount((prev) => {
      const updatedRooms = { ...prev };

      roomKey.forEach((key, index) => {
        updatedRooms[key] = filters[filterKey[index]];
      });

      return updatedRooms;
    });
  }, [bedsParams, bathParams, sleepsParams]);

 

  const [winSize, setWinSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 786;

      setWinSize(isMobile);

      if (isMobile) {
      } else {
        if (drawerOpen) {
          setDropDownOpen(drawerOpen);
          setDrawerOpen(null);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtersConfig = {
    filters,
    setFilters,
    initialFilters,
    setInitialFilters,
    hasFiltersChanged,
  };
  const uiConfig = {
    dropDownOpen,
    setDropDownOpen,
    drawerOpen,
    setDrawerOpen,
  };

  return (
    <div className=" ">
      <div className="flex justify-between w-full gap-x-4  mb-6 ">
        <div className="flex items-center w-full gap-2 border-b  ">
          <div className="w-full relative">
            <div className="max-md:overflow-x-auto filter-scroll py-3 pr-4  flex gap-2">
            <Badge color="#3a3a3a" count={appliedFiltersCount}>
                <div
                  onClick={openModalHandler}
                  className={`${
                    appliedFiltersCount ? "bg-slate-100" : "border-zinc-300"
                  } cursor-pointer border px-3 py-[8px] max-sm:text-xs rounded-full flex gap-1 items-center hover:bg-black/5`}
                >
                  <div
                    className={` ${
                      appliedFiltersCount ? "text-[#386b98]" : ""
                    } font-semibold flex gap-1  `}
                  >
                    <IoFilter className={`self-center text-lg`} />
                    <button>Filters</button>
                  </div>
                </div>
              </Badge>
              <div ref={dropdownRefBed} className="flex items-center">
                <RoomFilter
                  dropdownRef={dropdownRefBed}
                  activeKey={"bedrooms"}
                  filterHandler={() =>
                    filterHandler("bedroomsCount", "bedrooms")
                  }
                  roomsCount={roomsCount.bedroomsCount}
                  filtersConfig={filtersConfig}
                  uiConfig={uiConfig}
                />
              </div>
              <div ref={dropdownRefSleep} className="relative">
                <RoomFilter
                  dropdownRef={dropdownRefSleep}
                  activeKey={"sleeps"}
                  filterHandler={() => filterHandler("sleepsCount", "sleeps")}
                  roomsCount={roomsCount.sleepsCount}
                  filtersConfig={filtersConfig}
                  uiConfig={uiConfig}
                />
              </div>
              <div ref={dropdownRefBath} className="relative">
                <RoomFilter
                  dropdownRef={dropdownRefBath}
                  activeKey={"bathrooms"}
                  filterHandler={() =>
                    filterHandler("bathroomsCount", "bathrooms")
                  }
                  roomsCount={roomsCount.bathroomsCount}
                  filtersConfig={filtersConfig}
                  uiConfig={uiConfig}
                />
              </div>
            
            </div>
          </div>
        </div>

        {!winSize ? (
          <ModalUI
            title={<div className="px-6 py-4">filter</div>}
            open={open}
            handleOk={null}
            confirmLoading={null}
            okText={null}
            handleCancel={closeModalHandler}
            cancelText={null}
            okType={null}
            topStyle={{ top: 20 }}
            width={"640px"}
            footer={null}
            maskClosable={closeModalHandler}
          >
            <FilterContent
              filters={filters}
              setFilters={setFilters}
              hasFilterSelected={hasFilterSelected}
              winSize={winSize}
            />

            <div className="sticky bottom-0 left-0 right-0 bg-white p-4 foter-filter  flex gap-2 ">
              <div className="flex justify-end w-full gap-4">
                {hasFilterSelected && (
                  <Button
                    className="max-w-[50%]"
                    block
                    type="default"
                    onClick={clearAllParams}
                  >
                    Clear all
                  </Button>
                )}
                <Button
                  className="max-w-[50%]"
                  disabled={!hasFiltersChanged}
                  block
                  type="primary"
                  onClick={filterHandler}
                >
                  Apply
                </Button>
              </div>
            </div>
          </ModalUI>
        ) : (
          <Drawer
            footer={
              <div>
                <div className=" bg-white p-2   flex gap-2 ">
                  <div className="flex justify-end w-full gap-4">
                    {hasFilterSelected && (
                      <Button
                        className="max-w-[50%]"
                        block
                        type="default"
                        onClick={clearAllParams}
                      >
                        Clear all
                      </Button>
                    )}
                    <Button
                      className="max-w-[50%]"
                      disabled={!hasFiltersChanged}
                      block
                      type="primary"
                      onClick={filterHandler}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            }
            height={"100%"}
            title="Basic Drawer"
            placement="bottom"
            onClose={closeModalHandler}
            open={open}
          >
            <FilterContent
              filters={filters}
              setFilters={setFilters}
              hasFilterSelected={hasFilterSelected}
              winSize={winSize}
            />
          </Drawer>
        )}
      </div>
      <div className="mb-4 flex justify-end">
        <SortProperty />
      </div>
    </div>
  );
};

export default FilterContainer;

// let count = 0;
// let countedPrice = false;
// for (let key in filters) {
//   if (Array.isArray(filters[key]) && filters[key].length > 0) {
//     count+= filters[key].length;
//   }
//   if ((key === "minPrice" || key === "maxPrice") && !countedPrice) {
//     if (filters["minPrice"] > 0 || filters["maxPrice"] < 150) {
//       count++;
//       countedPrice = true;
//     }
//   }
//   if(["bedrooms","bathrooms","sleeps"].includes(key) && filters[key] > 0){
//     count++
//   }
// }

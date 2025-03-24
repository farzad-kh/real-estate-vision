"use client"
import React, { useCallback, useEffect, useState } from "react";
import DropDownUI from "../UI/DropDownUI";
import { AnimatePresence } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import DrawerUI from "../UI/DrawerUI";
import FilterRoomBtn from "./FilterRoomBtn";

 
const RoomFilter = ({
  roomsCount, filtersConfig, uiConfig,filterHandler,activeKey,dropdownRef
}) => {
  const { filters, setFilters, initialFilters, setInitialFilters, hasFiltersChanged, } = filtersConfig;
  const { dropDownOpen, setDropDownOpen, drawerOpen, setDrawerOpen  } = uiConfig;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState(null);
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const clearParamHandler = useCallback(
    (key) => {
      const params = new URLSearchParams(searchParams);
      setFilters((prev) => ({ ...prev, [key]:1 }));
      setInitialFilters((prev) => ({ ...prev, [key]: 1 }));
      params.delete(key);
      setDropDownOpen(null);
      setDrawerOpen(false);
      params.delete("page")
      const query = params.size > 0 ? "?" + params.toString() : "";
      router.push("/search" + query);
    },
    [searchParams, setFilters, setInitialFilters, setDropDownOpen, router]
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 786;
      
      setWindowSize(isMobile);

      if (isMobile) {
        if (dropDownOpen) {
          setDrawerOpen(dropDownOpen);
          setDropDownOpen(null);
        }
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
  }, [dropDownOpen, drawerOpen]);

  const onClose = () => {
    setFilters(initialFilters);
    setDrawerOpen(null);
    setDropDownOpen(null);
  };
 
  const roomFiltersConfig = {
    filters,
    setFilters,
    initialFilters,
    hasFiltersChanged,
    filterHandler,
    clearParamHandler: () => clearParamHandler(activeKey),
  };
  
  const roomUiConfig = {
    dropDownOpen,
    setDropDownOpen,
    dropdownRef,
    activeKey,
  };


 
  return (
    <div className="relative " id="counterBeds">
      <FilterRoomBtn
        activeKey={activeKey}
        filters={filters}
        roomsCount={roomsCount}
        setDrawerOpen={setDrawerOpen}
        setDropDownOpen={setDropDownOpen}
        windowSize={windowSize}
        setInitialFilters={setInitialFilters}
        clearParamHandler={() => clearParamHandler(activeKey)}
      />

      <>
        <AnimatePresence>
          {!windowSize && dropDownOpen === activeKey && (
            <DropDownUI  roomFiltersConfig={roomFiltersConfig} roomUiConfig={roomUiConfig}
          
            ></DropDownUI>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {windowSize && drawerOpen === activeKey && (
            <DrawerUI
              hasFiltersChanged={hasFiltersChanged}
              filterHandler={filterHandler}
              setFilters={setFilters}
              filters={filters}
              clearParamHandler={() => clearParamHandler(activeKey)}
              activeKey={activeKey}
              onClose={onClose}
            ></DrawerUI>
          )}
        </AnimatePresence>
      </>
    </div>
  );
};

export default RoomFilter;

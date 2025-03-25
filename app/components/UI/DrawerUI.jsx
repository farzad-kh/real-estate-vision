import { motion } from "motion/react";
import { CloseOutlined } from "@ant-design/icons";
import FilterBedrooms from "../module/FilterBedrooms";
import RoomFilterBtn from "../module/RoomFilterBtn";
const DrawerUI = ({
  activeKey,
  clearParamHandler,
  hasFiltersChanged,
  filterHandler,
  setFilters,
  onClose,
  filters,
}) => {
  return (
    <div className={"loading_info"}>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-2xl p-5 z-[70]"
        initial={{ transform: "translate3d(0, 100%, 0)" }}
        animate={{ transform: "translate3d(0, 0, 0)" }}
        exit={{ transform: "translate3d(0, 100%, 0)" }}
        transition={{ duration: 0.2 }}
        style={{ willChange: "transform" }}
      >
        <div className="flex justify-between items-center w-full ">
          <span className="capitalize font-semibold">{activeKey} count</span>
          <button className="top-2 text-lg font-bold" onClick={onClose}>
            <CloseOutlined />
          </button>
        </div>
        <div className="w-full border-b pb-2 mb-4"></div>
        <div className="mt-6">
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
              clearParamHandler={clearParamHandler}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default DrawerUI;


import { Badge } from 'antd';
import { PiShower } from "react-icons/pi";
import { CloseOutlined } from "@ant-design/icons";
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { LuBed } from "react-icons/lu";
import { AnimatePresence,motion } from 'motion/react';
const FilterRoomBtn = ({windowSize, setInitialFilters, clearParamHandler,setDropDownOpen,setDrawerOpen,roomsCount,activeKey,filters}) => {
      const toggleDropDown = (event, val) => {
        event.stopPropagation();
    
        if (windowSize) {
          setInitialFilters({ ...filters });
          setDropDownOpen(null);
          setDrawerOpen((prev) => (prev === val ? null : val));
        } else {
          setInitialFilters({ ...filters });
          setDrawerOpen(null);
          setDropDownOpen((prev) => (prev === val ? null : val));
        }
      };
    
    const badgIcons = {
        bedrooms: <MdOutlineMeetingRoom className="text-lg" />,
        bathrooms: <PiShower className="text-lg" />,
        sleeps: <LuBed  className="text-lg" />,
      };
    return (
        <Badge>
        <div
          role="button"
          onClick={(e) => toggleDropDown(e, activeKey)}
          className={`cursor-pointer border  px-3 py-[8px] rounded-full flex gap-1 items-center hover:bg-black/5 overflow-hidden ${
            roomsCount > 1 ? "bg-slate-100 text-[#386b98]" : "border-zinc-300"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {roomsCount > 1 ? (
              <motion.div
                className="flex gap-1"
                key="close-icon"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
              >
                <button
                  onClick={(e) => {
                    clearParamHandler()
                    e.stopPropagation();
                  }}
                >
                  <CloseOutlined className="text-sm" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="badge-icon"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
              >
                {badgIcons[activeKey]}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-sm capitalize max-sm:text-xs">
            {roomsCount > 1
              ? `${activeKey}: ${roomsCount}`
              : activeKey}
          </div>
        </div>
      </Badge>
    );
};

export default FilterRoomBtn;
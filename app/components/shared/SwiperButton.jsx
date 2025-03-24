 
import React, { useEffect,  useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const SwiperButton = ({swiperRef}) => {
     const [isBeginning, setIsBeginning] = useState(true);
      const [isEnd, setIsEnd] = useState(false);
    
      const handleNext = () => swiperRef.current?.slideNext();
      const handlePrev = () => swiperRef.current?.slidePrev();
      useEffect(() => {
        if (swiperRef.current) {
          const swiperInstance = swiperRef.current;
    
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
    
          swiperInstance.on("slideChange", () => {
            setIsBeginning(swiperInstance.isBeginning);
            setIsEnd(swiperInstance.isEnd);
          });
        }
      }, []);
      
    return (
        <div className="flex justify-end gap-4 mb-4 max-md:hidden items-center w-[96px] ">
        <button
          onClick={handlePrev}
          disabled={isBeginning}
          className={`  transition-all w-full  h-[36px]  p-1 rounded-md  bg-black/5 active:bg-black/15 ${
            isBeginning ? "opacity-40" : ""
          }`}
        >
          <div className="flex justify-center">
            <LeftOutlined className="text-black text-sm   " />
          </div>
        </button>

        <button
          onClick={handleNext}
          disabled={isEnd}
          className={`transition-all  w-full p-1 h-[36px]  rounded-lg bg-black/5 active:bg-black/15  ${
            isEnd ? "opacity-40" : ""
          }`}
        >
          <div className="flex justify-center">
            <RightOutlined className="text-black text-sm     " />
          </div>
        </button>
      </div>
    );
};

export default SwiperButton;
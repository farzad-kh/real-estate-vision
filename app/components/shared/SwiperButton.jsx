"use client";
import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const SwiperButton = ({ swiperRef }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiperInstance = swiperRef.current;

    const updateNavigation = () => {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    };

    
    updateNavigation();

    
    swiperInstance.on("slideChange", updateNavigation);
    swiperInstance.on("reachEnd", updateNavigation);
    swiperInstance.on("reachBeginning", updateNavigation);

    return () => {
      swiperInstance.off("slideChange", updateNavigation);
      swiperInstance.off("reachEnd", updateNavigation);
      swiperInstance.off("reachBeginning", updateNavigation);
    };
  }, [swiperRef.current]); 

  return (
    <div className="flex justify-end gap-4 mb-4 max-md:hidden items-center w-[96px]">
      <button
        onClick={handlePrev}
    
        className={`transition-all h-[36px] min-w-9 w-9   rounded-md bg-black/5 active:bg-black/15 ${
          isBeginning ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <div className="flex justify-center">
          <LeftOutlined className="text-black text-sm" />
        </div>
      </button>

      <button
        onClick={handleNext}
      
        className={`transition-all h-[36px] min-w-9 w-9 rounded-lg bg-black/5 active:bg-black/15 ${
          isEnd ? "opacity-40 cursor-not-allowed" : ""
        }`}
      >
        <div className="flex justify-center">
          <RightOutlined className="text-black text-sm" />
        </div>
      </button>
    </div>
  );
};

export default SwiperButton;

"use client";
import { useGetRecentProperties } from "@/app/hooks/useGetRecentProperties";
import React, { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";
import CardContainer from "./CardContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { NotificationProvider } from "@/app/context/NotificationContext";
import { Skeleton } from "antd";
import SwiperButton from "../shared/SwiperButton";
 
const RecentlyProperty = () => {
  const { data: recentProperties, isFetching } = useGetRecentProperties();
  const swiperRef = useRef(null);
 

  return (
    <NotificationProvider>
      <section className="block">
        <div className="max-sm:text-xl text-2xl font-semibold mb-4 flex justify-between items-center">
          <span>Recently Added</span>

          {/* Navigation Buttons */}
      <SwiperButton swiperRef={swiperRef}/>
        </div>

        {/* Swiper Section */}
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
      
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
     
       
          className="mySwiper !pt-3"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {isFetching
            ? [...Array(8)].map((_, index) => (
                <SwiperSlide
                  key={index}
                  className=" w-full rounded-md px-1"
                >
                  <Skeleton.Node className="!w-full min-h-48 mb-4" active />
                  <Skeleton paragraph={{ rows: 2 }} />
                </SwiperSlide>
              ))
            : recentProperties?.map((item) => (
                <SwiperSlide
                  className=" rounded-md px-1"
                  key={item.id}
                >
                  <CardContainer property={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </section>
    </NotificationProvider>
  );
};

export default RecentlyProperty;

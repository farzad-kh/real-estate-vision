// "use client";
// import React from "react";
// import "@splidejs/react-splide/css";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css/skyblue";
// import "@splidejs/react-splide/css/core";
// import ImageCardUI from "./ImageCardUI";

// const SplideSlideUI = ({ images }) => {
//   const splitImage = images?.slice(0, 8);

//   return (
//     <Splide
//       options={{
//         rewind: true,
//         arrows: true,
//         lazyLoad: "nearby",
//         pagination: true,
//         speed: 300, // سرعت کمتر برای جلوگیری از لگ
//         cover: false,
//         paginationKeyboard: true,
//         waitForTransition: true, // جلوگیری از فریز شدن در جابجایی سریع
//       }}
//       className="!p-0"
//       aria-label="My Favorite Images"
//     >
//       {splitImage.map((image, i) => (
//         <SplideSlide key={i} className="overflow-hidden">
//           <ImageCardUI imgUrl={image} />
//         </SplideSlide>
//       ))}
//     </Splide>
//   );
// };

// export default SplideSlideUI;

"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
 
import { Navigation, Pagination } from "swiper/modules";
import ImageCardUI from "./ImageCardUI";

const SplideSlideUI = ({ images }) => {
  const splitImage = images?.slice(0, 8);
  const swiperRef = useRef(null);

  const optimizedImages = splitImage.map((img) => {
    const parts = img.split("upload/");
    return `${parts[0]}upload/q_70/${parts[1]}`;
  });
  


  return (
    <Swiper
    style={{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }}
      className="card-slider"
      ref={swiperRef}
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      spaceBetween={50}
      navigation={ true}
      lazy={"true"}
     
  
  
      pagination={{
        dynamicBullets: true,
      }}
     
      speed={300}
      lazyPreloadPrevNext={0}
    >
      {optimizedImages.map((image, i) => (
        <SwiperSlide key={i} virtualIndex={i}>
          <ImageCardUI imgUrl={image} />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white !w-8 !h-8"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SplideSlideUI;

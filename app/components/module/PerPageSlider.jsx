"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

import { useRef } from "react";
import SwiperButton from "../shared/SwiperButton";

const PerPageSlider = () => {
  const card = [
    {
      id: 1,
      lable: "cabin",
      image:
        "https://res.cloudinary.com/drjhkyxst/image/upload/v1742191400/k6yfxwslwtw1kgimdsqy.jpg",
      href: "/search?type=cabin",
    },
    {
      id: 2,
      lable: "villa",
      image:
        "https://res.cloudinary.com/drjhkyxst/image/upload/v1742192605/fxdecclicmr2nioodptl.jpg",
      href: "/search?type=villa",
    },
    {
      id: 3,
      lable: "apartment",
      image:
        "https://res.cloudinary.com/drjhkyxst/image/upload/v1742193559/gswtyzpacptqquzdodak.jpg",
      href: "/search?type=apartment",
    },
    {
      id: 4,
      lable: "farmhouse",
      image:
        "https://res.cloudinary.com/drjhkyxst/image/upload/v1742194332/enhgzbge0cij5puwxrwm.jpg",
      href: "/search?type=farmhouse",
    },
    {
      id: 5,
      lable: "house",
      image:
        "https://res.cloudinary.com/drjhkyxst/image/upload/v1742195498/n6p3nde5jtnly4epxxxp.jpg",
      href: "/search?type=house",
    },
    {
      id: 6,
      lable: "lodge",
      image:
        "https://res.cloudinary.com/drjhkyxst/image/upload/v1742278423/ben-den-engelsen-ApEIB0Ea3Kg-unsplash_1_zkccer.jpg",
      href: "/search?type=lodge",
    },
  ];
  const swiperRef = useRef(null);

  return (
    <section className="block max-md:pr-4 p-0 ">
      <div className="max-sm:text-xl text-2xl font-semibold mb-4 flex justify-between items-center">
        <span> Discover Unique Stays</span>
        {/* Navigation Buttons */}
        <SwiperButton swiperRef={swiperRef} />
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={15}
        slidesPerView="auto"
        className="mySwiper"
      >
        {card.map((item) => (
          <SwiperSlide
            className="max-xs:w-[268px] max-w-[300px] w-full"
            key={item.id}
          >
            <Link href={item.href} className="overflow-hidden  w-full">
              <Image
                width={300}
                height={100}
                src={item.image}
                alt="Stays"
                className="aspect-[12/15] w-full rounded-lg bg-loader "
              />
              <div className="text-base font-semibold my-2 capitalize">
                {item.lable}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PerPageSlider;

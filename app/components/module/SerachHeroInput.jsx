"use client";

import Searching from "./Searching";
import Image from "next/image";
import logo from "@/public/hero.jpg";
import { Suspense } from "react";

const SerachHeroInput = () => {
  return (
    <section className="block w-full relative  h-[600px]  ">
      <Image
        src={logo}
        alt="Background"
        width={600}
        height={600}
        className="z-[-1] absolute object-cover left-0 h-full w-full  brightness-90  overflow-hidden"
      />
      <div className=" flex w-full left-0 pt-5 text-white  max-sm:h-[300px] h-[400px] justify-center m-auto  z-30  ">
        <div
          id="input-container"
          className="backdrop-blur-[2px] w-full  max-w-xl mt-10"
        >
          <h1 className="font-semibold max-sm:!text-lg !text-4xl uppercase !mb-0">
            finde the perfect rental
          </h1>
          <p className="!text-base font-semibold mb-4 uppercase">
            discover yor house
          </p>
          <Suspense>
            <Searching />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default SerachHeroInput;

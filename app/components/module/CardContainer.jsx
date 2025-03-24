"use client";
import { Card } from "antd";
import React from "react";
import CardTitle from "../UI/CardTitle";
import Image from "next/image";
import { motion } from "motion/react";
import SplideSlideUI from "../UI/SplideSlide";
import Link from "next/link";
const CardContainer = ({ property, i }) => {
  return (
    <motion.div
      className="block "
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Link href={`/property/${property.id}`}>
    
      <Card variant="borderless" 
        key={property.id}
        style={{border:"none"}}
        cover={
          property.images.length > 1 ? (
            <SplideSlideUI images={property.images} />
          ) : (
            <Image
              className={`w-full overflow-hidden !rounded-md  bg-loader  aspect-[16/10]

                      `}
              alt={`Property image ${property.images}`}
              width={0}
              height={0}
              sizes="100vw"
              src={`${property.images}`}
            />
          )
        }
      >
        
        <div>
          <CardTitle property={property} />
        </div>
      </Card>
      </Link>
    </motion.div>
  );
};

export default CardContainer;

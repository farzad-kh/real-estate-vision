"use client";
 
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";

const SmGridImg = ({ propertyImg }) => {
  const thumbnails = propertyImg.slice(1, 5);

  return (
    <div className="col-span-4 grid grid-cols-2 grid-rows-2 gap-4">
      <LightGallery
        className="animated-thumbnails"
        speed={350}
        plugins={[lgThumbnail, lgZoom]}
        mode="lg-fade"
      >
        {thumbnails.map((img, i) => (
          <a
            key={i}
            href={`${img}`}
            data-src={`${img}`}
            data-lg="property-group" 
            className="block overflow-hidden rounded-md"
          >
            <Image
              width={0}
              height={0}
              sizes="100vw"
              alt={`Image_${i + 1}`}
              src={`${img}`}
              className="w-full h-auto object-cover"
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default SmGridImg;

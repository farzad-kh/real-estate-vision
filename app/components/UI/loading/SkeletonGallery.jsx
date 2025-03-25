"use client";
import { Skeleton } from "antd";
import React from "react";

const SkeletonGallery = () => {
  const skeletons = [
    {
      key: 1,
      className: "!w-full !h-full object-cover rounded-md  aspect-[16/10]",
    },
    {
      key: 2,
      className: "!w-full !h-full object-cover rounded-md  aspect-[16/10]",
    },
    {
      key: 3,
      className: "!w-full !h-full object-cover rounded-md  aspect-[16/10]",
    },
    {
      key: 4,
      className: "!w-full !h-full object-cover rounded-md  aspect-[16/10]",
    },
  ];

  return (
    <div className="flex gap-2 mb-6">
      <div className="max-md:w-full w-1/2  cursor-pointer  ">
        <Skeleton.Image
          active={true}
          className={
            " !w-full !h-full object-cover max-md:rounded-none rounded-md bg-loader aspect-[16/10]"
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-2 w-1/2 max-md:hidden ">
        {skeletons.map((skeleton) => (
          <Skeleton.Image
            key={skeleton.key}
            active={true}
            className={skeleton.className}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonGallery;

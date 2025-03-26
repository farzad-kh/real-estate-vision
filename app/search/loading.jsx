"use client"
import React from "react";
import LoadingProperties from "../properties/loading";
import { Skeleton } from "antd";

const loading = () => {
  return (
    <div>
      <div className="mb-7 w-full flex gap-4 border-b border-gray-200 pb-4">
        <Skeleton.Button shape="round"  active className="!w-24 " />
        <Skeleton.Button shape="round" active className="!w-24  " />
        <Skeleton.Button shape="round" active className=" !w-24 " />
        <Skeleton.Button shape="round" active className=" !w-24 " />
      </div>
      <LoadingProperties />
    </div>
  );
};

export default loading;

"use client";
import { Flex, Skeleton } from "antd";
import React from "react";

const MessageContainerLoading = () => {
  const message = [0, 1, 2, 3];
  return (
    <section className="w-full loading_info ">
      <div className="w-full relative">
        <div className="flex justify-start gap-9 flex-col  ">
          <div className="flex justify-between pr-4 mt-1  ">
            <h2 className=" text-xl font-semibold mb-3 ">My Messages</h2>
          </div>

          {message?.map((item,i) => (
            <div key={i} className="  border-b">
              <div className="  flex max-md:flex-col  gap-4    py-3  ">
                <div className="aspect-[16/10] min-w-[340px] max-sm:min-w-full  rounded-md">
                  {/* {image skeleton} */}
                  <Skeleton.Image active className="!w-full !h-full" />
                </div>
                <div className="flex flex-col max-md:w-full w-1/3  ">
                  {/* {title skeleton} */}
                  <Skeleton active paragraph={{ rows: 4 }} />
                  <Flex className="mt-10" gap={16}>
                    
                    <div className="max-sm:w-1/2 w-28">
                      <Skeleton.Button active block />
                    </div>
                    <div className="max-sm:w-1/2 w-28">
                      <Skeleton.Button active block />
                    </div>
                  </Flex>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessageContainerLoading;

"use client";
import React from "react";
import { Card, Col, Row, Skeleton } from "antd";
import SkeletonGallery from "@/app/components/UI/loading/SkeletonGallery";

const loading = () => {
  return (
    <div className="max-md:py-0 py-7 w-full">
      <div className="container max-w-screen-2xl   m-auto  max-md:px-0 px-7 ">
        <SkeletonGallery />
      </div>
      <div className="container max-w-screen-2xl    m-auto  max-md:px-4 px-7  ">
        <Row className="">
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <div className="w-full ">
              <div className="mb-6">
                <div className="mb-1 loading_info">
                  <Skeleton active
                    paragraph={{
                      rows: 0,
                    }}
                  />
                </div>
                <div>
                  <Skeleton
                    active="active"
                    paragraph={{
                      rows: 1,
                      width: ["70%", "40%"],
                    }}
                  />
                </div>
              </div>
              <div className="mb-10">
                <div className="loading-price">
                  <Skeleton
                    active="active"
                    paragraph={{
                      rows: 2,
                    }}
                  />
                </div>
              </div>
              <div className="mb-28">
                <div>
                  <Skeleton
                    active="active"
                    paragraph={{
                      rows: 4,
                      width: ["90%", "70%", "75%", "50%"],
                    }}
                  />
                </div>
              </div>
              <div className="Skeleton_amenities">
                <div className="mb-4">
                  {" "}
                  <Skeleton paragraph={{ rows: 0 }} />
                </div>
                <div className="grid grid-cols-2  gap-3">
                  {[...Array(8)].map((skl, i) => (
                    <Skeleton.Input key={i} active={"active"} size="small" />
                  ))}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <div className="w-full flex justify-end contact-card-max ">
              <div className=" border border-gray-200     w-3/4 min-w-[340px]   rounded-lg p-5">
                <div>
                  <div id=" " className="flex justify-between ">
                    <Skeleton.Input active size="small" />
                    <Skeleton.Input active size="small" />
                  </div>
                  <div className="w-full h-[1px] bg-gray-100  mt-2"></div>
                  <div className="my-3">
                    <Skeleton
                      active
                      block
                      paragraph={{
                        rows: 1,
                      }}
                    />
                  </div>

                  <div className="my-4">
                    <Skeleton.Button active block size="default" />
                  </div>
                  <div className="flex justify-between ">
                    <Skeleton.Input active size="small" />
                    <Skeleton.Input active size="small" />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default loading;

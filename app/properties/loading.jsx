"use client";
import React from "react";
import { Col, Row, Skeleton } from "antd";
const LoadingProperties = () => {
 
  return (
    <section className="items-center w-full loading_info ">

<div className="mb-10 "/>
 
 

      <Row
        gutter={[
          16,  
          16,  
        ]}
      >
        {[...Array(12)].map((item,i) => (
          <Col
            key={i + 1}
            className="gutter-row justify-center w-full py-4  rounded-md overflow-hidden"
            sm={12}  
            md={12}  
            lg={8}  
            xl={6}
          >
            {/* <div style={style}>Item {item.id}</div> */}
            <Skeleton.Node
              className="!w-full !min-h-48  mb-4 "
              active={true}
            ></Skeleton.Node>
            <Skeleton active paragraph={{ rows: 2 }} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default LoadingProperties ;

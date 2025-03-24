"use client";
import { Col, Row } from "antd";
import { motion } from "motion/react";

import CardContainer from "../module/CardContainer";

const ProppertieContainer = ({ properties }) => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="items-center w-full grid-c gg"
      >
        <Row justify={"start"} gutter={[20, 20]}>
          {properties.map((property, i) => (
            <Col
              key={i + 1}
              className="gutter-row justify-center w-full py-4  h-max  rounded-md overflow-hidden"
              sm={12}
              md={12}
              lg={8}
              xl={6}
            >
              <CardContainer property={property} i={i} />
            </Col>
          ))}
        </Row>
      </motion.section>
    </>
  );
};

export default ProppertieContainer;

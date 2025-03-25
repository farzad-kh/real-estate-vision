"use client";

import { Col, Row } from "antd";

import PropertyInfo from "../module/PropertyInfo";
import dynamic from "next/dynamic";
import ContactCard from "../module/ContactCard";

import { NotificationProvider } from "@/app/context/NotificationContext";
import SkeletonGallery from "../UI/loading/SkeletonGallery";

const Gallery = dynamic(() => import("../module/LightGallery"), {
  ssr: false,
  loading: () => <SkeletonGallery />,
});
const ProperyId = ({ property, isOwner, hasSentMessage }) => {
  const propertyDetails = {
    id: property.id,
    name: property.name,
    userId: property.userId,
    location: property.location,
    rates: property.rates,
    squareCm: property.square_cm,
    sleep: property.sleeps,
    bedrooms: property.bedrooms,
    owner: isOwner,
    hasSentMessage,
  };

  return (
    <NotificationProvider>
      <div  className=" max-md:py-0 py-7 " >
        <div className="container max-w-screen-2xl   m-auto  max-md:px-0 px-7 flex ">

        <Gallery propertyImg={property?.images} />
        </div>
        <Row gutter={[16, 16]}  >
          <div className="container max-w-screen-2xl   m-auto  max-md:px-4 px-7 flex ">

          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <section className="w-full">
              <PropertyInfo property={property} />
            </section>
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <section className="sticky top-5 ">
              <aside>
                <ContactCard
                  propertyDetails={propertyDetails}
                  hasSentMessage={hasSentMessage}
                  />
              </aside>
            </section>
          </Col>
                  </div>
        </Row>
      </div>
    </NotificationProvider>
  );
};

export default ProperyId;

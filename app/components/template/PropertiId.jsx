// "use client";
// import React from "react";
// import { Col, Row } from "antd";

// import PropertyInfo from "../module/PropertyInfo";
// import dynamic from "next/dynamic";
// const Gallery = dynamic(() => import("../module/LightGallery"), {
//   ssr: false,
// });
// const PropertiId = ({ property }) => {
//   return (
//     <div>
//       <Row className="col-reverse-24">
//         <Col xs={24} sm={24} md={24} lg={14} xl={14}>
//           <section className="w-full max-lg:px-0 px-4 ">
//             <PropertyInfo property={property} />
//           </section>
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={10} xl={10}>
//           <section className="grid  gap-4 thumbnails max-lg:px-0 px-4   ">
//             <Gallery propertyImg={property?.images} />
//           </section>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PropertiId;

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
      <div>
        <Gallery propertyImg={property?.images} />
        <Row gutter={[16, 16]} >
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <section className="w-full">
              <PropertyInfo property={property} />
            </section>
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <section className="sticky top-5">
              <aside>
                <ContactCard
                  propertyDetails={propertyDetails}
                  hasSentMessage={hasSentMessage}
                />
              </aside>
            </section>
          </Col>
        </Row>
      </div>
    </NotificationProvider>
  );
};

export default ProperyId;

// "use client";
// import React from "react";
// import { Col, Row } from "antd";

// import PropertyInfo from "../module/PropertyInfo";
// import dynamic from "next/dynamic";
// const Gallery = dynamic(() => import("../module/LightGallery"), {
//   ssr: false,
// });
// const PropertiId = ({ property }) => {
//   return (
//     <div>
//                 <Gallery propertyImg={property?.images} />
//       <Row className="col-reverse-24">
//         <Col xs={24} sm={24} md={24} lg={14} xl={14}>
//           <section className="w-full max-lg:px-0 px-4 ">

//             <PropertyInfo property={property} />
//           </section>
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={10} xl={10}>
//           <section className="  ">

//           </section>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default PropertiId;

"use client"
 
import CardContainer from "../module/CardContainer";
import { NotificationProvider } from "@/app/context/NotificationContext";
import { BsBookmarks } from "react-icons/bs";
import PaginationUI from "../UI/PaginationUI";
const BookmarkContainer = ({ bookmarkProperty, bookmarkTotal,pageSize }) => {
 


if(bookmarkProperty.length===0)   return (
      <div className="w-full  justify-center items-center flex max-md:mt-11">
        <div className="flex flex-col gap-4 items-center">
          <div>
            <BsBookmarks  className="text-xl" />  
          </div>
          <p>You haven't bookmarked any properties!</p>
        </div>
      </div>
    );

  return (
    <NotificationProvider>
      <section>
        <div className="mt-1 ">
          <h2 className=" text-xl font-semibold mb-10 ">My Bookmarks</h2>
        </div>

        <div
          className={`xl:grid-cols-3  grid gap-5 ${
            bookmarkProperty.length === 1
              ? "grid-cols-autofitbookmark1"
              : "grid-cols-autofitbookmark"
          }`}
        >
       
            {bookmarkProperty?.map((item, i) => (
              <CardContainer
                key={item.property.id}
                property={item.property}
                i={i}
              />
            ))}

        </div>
        <PaginationUI
              propertiesTotal={bookmarkTotal}
              pageSize={pageSize}
              />
      </section>
    </NotificationProvider>
  );
};

export default BookmarkContainer;

// "use client";

// import React from "react";
// import CardContainer from "../module/CardContainer";
// import { Col, Row } from "antd";

// const BookmarkContainer = ({ bookmarkProperty }) => {
//   return (
//     <div className="items-center w-full grid-c gg">
//       <Row justify={"start"} gutter={[20, 20]}>
//         {bookmarkProperty.map((item, i) => (
//           <Col
//             key={i + 1}
//             className="gutter-row justify-center w-full py-4  h-max  rounded-md overflow-hidden"
//             sm={12}
//             md={12}
//             lg={12}
//             xl={10}
//           >

//               <CardContainer property={item.property} i={i} />

//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default BookmarkContainer;

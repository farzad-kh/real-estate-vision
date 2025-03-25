import { Flex, Typography } from "antd";

import Amenities from "./Amenities";
import RulesHome from "./RulesHome";
import PropertyRate from "./PropertyRate";
import dynamic from "next/dynamic";
import LocationProperty from "./LocationProperty";
import PropertyDescription from "./PropertyDescription";
const PropertyMap = dynamic(() => import("./PropertyMap"), {
  loading:()=> <PropertyMapLoading />,
});

import QuickFacts from "./QuickFacts";
import SharedBtn from "./SharedBtn";
import BookmarkBtn from "./BookmarkBtn";
import PropertyMapLoading from "../UI/loading/PropertyMapLoading";

import ActiveScroll from "../UI/ActiveScroll";
import ObserverWrapper from "../shared/ObserverWrapper";
const { Title, Text } = Typography;
const PropertyInfo = ({ property }) => {
  return (
    <Flex  id="activeNav" vertical gap={20}>
    
      <section className="transition-all ">
        <div className="flex gap-3 justify-end mb-6  lg:hidden">
          <SharedBtn id={property.id} defaultType>
            Shared
          </SharedBtn>
          <BookmarkBtn id={property.id} defaultType>
            Bookmark
          </BookmarkBtn>
        </div>
        <Flex vertical gap={4}>
          <Text
            className="font-semibold capitalize"
            style={{ fontSize: "14.5px" }}
            type="secondary"
          >
            {property?.type}
          </Text>
          <Title style={{margin: 0 }}>
            {property?.name}
          </Title>
          {/* location property */}
          <LocationProperty location={property?.location} />
        </Flex>
      </section>
      {/* Pricing Plans */}
      <section className="lg:hidden transition-all">
        <PropertyRate rates={property?.rates} />
      </section>

    <div className="transition-all"   id="property-header"></div>
      <ActiveScroll>

      <section id="Description" className="w-full py-4">
        <PropertyDescription description={property?.description} />
      </section>
      <section id="Quick-facts" className="w-full py-4">
        {/* {Quick facts} */}
        <QuickFacts property={property} />
      </section>

      <section className="w-full py-4" id="Amenities">
        {/* {amenities} */}
        <Amenities amenities={property?.amenities} />
      </section>


      <section className="w-full py-4" id="Location">
        {/* {google map} */}
        <ObserverWrapper>
          
        <PropertyMap location={property.location} />
        </ObserverWrapper>
      </section>
      <section className="w-full pt-7 pb-4" id="Rental-policies">
        {/* House Rules */}
        <RulesHome rules={property?.rules} />
      </section>
      </ActiveScroll>

     
    
    </Flex>
  );
};

export default PropertyInfo;

 
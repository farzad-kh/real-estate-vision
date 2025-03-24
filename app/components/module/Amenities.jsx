import React, { useState } from "react";
import { Button, Flex, Typography } from "antd";
import IconAmeniti from "../../asset/amenities/index";

const Amenities = ({ amenities }) => {
  const { Text } = Typography;
  const [showMore, setShowMore] = useState(false);
  
  if (!amenities) return null;
  
  const displayedAmenities = showMore ? amenities : amenities.slice(0, 6);

  return (
    <Flex vertical gap={20} className="borderB pb-8">
      <h2 className="gradient_title inline" level={2}>Amenities</h2>
      <div className="grid grid-cols-2 gap-3">
        {displayedAmenities.map((amenitie, i) => (
          <Flex key={i} gap={10}>
            {IconAmeniti[amenitie]}
            <Text className="ellipsis ">
              {amenitie}
            </Text>
          </Flex>
        ))}
      </div>
      {amenities.length > 6 && (
  <div className="flex justify-start">
      <Button   style={{ padding: 0 }} className="w-min"    type="link"
   
   onClick={() => setShowMore(!showMore)}
 >
   {!showMore ? "Show more" : "Show less"}
 </Button>
  </div>
      )}
    </Flex>
  );
};

export default Amenities;

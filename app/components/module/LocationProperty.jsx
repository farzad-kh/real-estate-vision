import { Flex, Typography } from "antd";
 

import { FaLocationDot } from "react-icons/fa6";
const LocationProperty = ({ location, ContactCard,userCard }) => {
  const { Text } = Typography;
  return (
    <Flex  gap={3}>
     

      <div className={` font-semibold   overflow-hidden ${userCard ?"ellipsis":""}`}>
        <Text type="secondary">
          {location?.street}
          {","}
        </Text>
        <Text type="secondary">
          {location?.city}
          {","}
        </Text>
        <Text type="secondary" className="">
          {location?.state}
          {","}
        </Text>

        <Text type="secondary">
          {location?.zipcode}
        
        </Text>
        {ContactCard ? (
          ""
        ) : (
          <Text type="secondary" className="capitalize">{" ∙ "}{location?.country}</Text>
        )}
      </div>
    </Flex>
  );
};

export default LocationProperty;

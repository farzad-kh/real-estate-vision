import { Flex, Typography } from "antd";
 

import { FaLocationDot } from "react-icons/fa6";
const LocationProperty = ({ location, ContactCard,userCard }) => {
  const { Text } = Typography;
  return (
    <Flex  gap={3}>
      {!ContactCard && <FaLocationDot className="mt-1 text-[#8b8b8b]" />}

      <div className={` overflow-hidden ${userCard ?"ellipsis":""}`}>
        <Text>
          {location?.street}
          {" ∙ "}
        </Text>
        <Text>
          {location?.city}
          {" ∙ "}
        </Text>
        <Text className="uppercase">
          {location?.state}
          {" ∙ "}
        </Text>

        <Text>
          {location?.zipcode}
        
        </Text>
        {ContactCard ? (
          ""
        ) : (
          <Text className="capitalize">{" ∙ "}{location?.country}</Text>
        )}
      </div>
    </Flex>
  );
};

export default LocationProperty;

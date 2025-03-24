 
import { Flex, Typography } from "antd";


import { ratesPer } from "@/app/utils/helpers";
 
const PropertyRate = ({ rates }) => {
  const { Title} = Typography;

  const [price, perPrice] = ratesPer(rates).split("/");
  return (
    <Flex className="mb-2" vertical>
      <Flex gap={2}>
        <Title style={{ margin: 0 }} level={2}>
          {price}
        </Title>

        <Title style={{ color: "#555" }} className="!mt-1 !mb-0" level={3}>
          {"/"}
          {perPrice}
        </Title>
      </Flex>
    </Flex>
  );
};

export default PropertyRate;

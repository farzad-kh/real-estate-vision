 
import { Flex, Typography } from "antd";
import { ratesPer } from "@/app/utils/helpers";

const { Text } = Typography;

import Meta from "antd/es/card/Meta";
import BookmarkBtn from "../module/BookmarkBtn";
import { EnvironmentOutlined } from "@ant-design/icons";
const CardTitle = ({ property }) => {
  return (
    <div className="mt-2">
      <Flex justify="space-between">
        <Flex
          className="text-[#606060] mb-[6px] font-semibold capitalize"
          gap={4}
        >
          <span>{property.type}</span>
          <span>∙</span>
          <span>
            {property?.bedrooms} {"bedrooms"}
          </span>
          <span>∙</span>
          <span>
            {property?.sleeps} {"sleeps"}
          </span>
        </Flex>

        <div className="absolute top-[4px] left-[4px] z-[25]">
          <BookmarkBtn btnStyle id={property.id} />
        </div>
      </Flex>
      <Meta
        style={{ padding: "0", marginBottom: "12px" }}
        title={property.name}
      />
      <>
        <div className="absolute top-2 right-2  bg-white text-slate-950 font-semibold  z-20  px-3 py-1 rounded-lg shadow text-sm">
          {ratesPer(property.rates)}
        </div>
        <div className="absolute left-2 top-2"></div>
      </>

      <Flex justify="space-between">
        <div className="font-semibold ellipsis gap-1">
          <EnvironmentOutlined />
          <Text className="capitalize"> {property.location.country}</Text>
          <Text> {property.location.city}</Text>
          <Text> {property?.location.state}</Text>
        </div>
      </Flex>
    </div>
  );
};

export default CardTitle;

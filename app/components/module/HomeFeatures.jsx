import { Flex, Typography } from "antd";

 
import featureIcon from "../../asset/homeFeatures/index"
const HomeFeatures = ({ features, icon ,title}) => {
  const { Text } = Typography;
  return (
    
      <Flex gap={7} align="center">
       <span>
        {featureIcon[title]}
       </span>
        <Text  >{features} {title} </Text>
      </Flex>
  
  );
};

export default HomeFeatures;

// import React from "react";
// import { Flex, Typography } from "antd";
// import IconRules from "@/app/asset/rulesIcon/index";
// import dayjs from "dayjs";
// import { CiLogin } from "react-icons/ci";
// import { CiLogout } from "react-icons/ci";
// const RulesHome = ({ rules }) => {
//   const { Text} = Typography;

//   return (
//     <Flex vertical gap={20} className="borderB pb-8 ">
//       <h2 className="gradient_title inline">House Rules</h2>
//       <div className="grid grid-cols-2  gap-3">
//         {Object?.entries(rules).map(([key, val]) =>
//           typeof val === "boolean" && (
//             <Flex gap={6} key={key} vertical>
//               <Flex gap={6}>
//                 {IconRules[key + val]}
//                 <Text className="capitalize">
//                   {val ? `${key} allowed` : `no ${key} allowed`}
//                 </Text>
//               </Flex>
//             </Flex>
//           )
//         )}

//       </div>
//     </Flex>
//   );
// };

// export default RulesHome;
 

import React from "react";
import { Flex, Typography } from "antd";
import IconRules from "@/app/asset/rulesIcon/index";
import dayjs from "dayjs";

import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import RentalPolicies from "./RentalPolicies";
const RulesHome = ({ rules }) => {
  const { Text } = Typography;
  const dateToString = (val, check) => {
    console.log({ val, check });

    const date = dayjs(val);
    const time = date.format("HH:mm A");
    const titleTime = check === "checkIn" ? "Check in" : "Check out";
    return (
      <div className="flex gap-1 ">
        {titleTime === "Check in" ? (
          <CiLogin className="items-center self-center text-[21px]" />
        ) : (
          <CiLogout className="items-center self-center text-[21px]" />
        )}
        <Flex gap={3} className="font-semibold">
          {titleTime}:
        </Flex>
        <Flex gap={3}>
          {check === "checkIn" ? "From" : "Until"}
          {time}
        </Flex>
      </div>
    );
  };
  return (
    <Flex vertical gap={20} className="pb-8 ">
      <h2 className="gradient_title inline">Rental policies</h2>
      <div className="grid grid-cols-1  gap-3">
        <Flex vertical gap={6} className="border rounded-lg p-4">
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-3">House rules</h3>
            <div className="flex flex-col  gap-[10px]">
              {Object?.entries(rules).map(([key, val]) =>
                typeof val === "boolean" ? (
                  <Flex gap={6} key={key} vertical>
                    <Flex gap={6}>
                      <Flex gap={3}>
                        {IconRules[key + val]}
                        <Text className="font-semibold">{key} :</Text>
                      </Flex>
                      <Text className="capitalize">
                        {val ? `${key} allowed` : `no ${key} allowed`}
                      </Text>
                    </Flex>
                  </Flex>
                ) : (
                  <Flex gap={6} key={key} vertical>
                    <Flex gap={6}>
                      {/* <Text className="capitalize">{new Date(val)}</Text> */}
                      {dateToString(val, key)}
                    </Flex>
                  </Flex>
                )
              )}
            </div>
          </div>
          <div className="pb-6">
          <RentalPolicies/>  
          </div>

          
        </Flex>
      </div>
    </Flex>
  );
};

export default RulesHome;

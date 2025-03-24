import React from "react";
import { Button, Flex, Typography } from "antd";

import ContactFormInput from "./ContactFormInput";
 
const { Title, Text} = Typography;
const ContactForm = ({ rates, id, owner, hasSentMessage, userId,session }) => {


  return (
    <>
      <Flex vertical gap={12}>
        <Title className="text-center" level={3}>
          Contact property manager
        </Title>
        <Flex className="max-sm:border-b border-gray-200" wrap justify="center">
          {Object.entries(rates).map(
            ([key, val]) =>
              val > 0 && (
                <div
                  key={key}
                  className="flex justify-center  flex-col items-center  p-4 bg-white border-r last:border-none max-sm:border-r-0  border-gray-200  "
                >
                  <Flex>
                    <span className="font-semibold text-lg">
                      ${val.toLocaleString()}
                    </span>

                    <span className="text-[#555] font-semibold  text-base mt-[2px]">
                      {"/"}
                      {key}
                    </span>
                  </Flex>
                </div>
              )
          )}
        </Flex>

        <Flex vertical gap={16}>
          {owner ? (
            <div className="text-center p-4 bg-gray-100 rounded-md flex flex-col">
              <Text>You are the owner of this property.</Text>
              <Button size="large"
                type="primary"
                href="/dashboard/properties"
                className="mt-2"
                >
                Manage Your Property
              </Button>
            </div>
          ) : session ? (
            <ContactFormInput
              id={id}
              userId={userId}
              hasSentMessage={hasSentMessage}
            />
          ) : (
           
            <div className="text-center font-semibold text-blue-500">Sign in to send a message to the owner!</div>
            
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ContactForm;

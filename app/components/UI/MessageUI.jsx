
import React from "react";
import ReadMessage from "../module/ReadMessage";
import {  Flex, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import DeleteMessage from "../module/DeleteMessage";
 
import dayjs from "dayjs";
const { Link:LinkAnt} = Typography;
const MessageUI = ({ message, messageApi }) => {
  
 
  const formattedDate = dayjs().format("MMMM D, YYYY, h:mm A");
  
 
  return (
    <div className=" w-full border-b last:border-none animate-fadeIn ">
      <div className="  flex max-md:flex-col  gap-4    py-3  ">
        <div className="max-md:self-auto max-sm:self-auto self-center cursor-pointer">
          <Image
          alt="property immage"
            className="aspect-[16/10] min-w-[340px]  max-sm:min-w-full  rounded-md "
            width={340}
            height={340}
            src={message.property.images[0]}
          />
        </div>
        <div className="w-full flex justify-between  flex-col ">
          <Link
            className=" cursor-pointer"
            href={`property/${message.propertyId}`}
          >
         <h3 className="text-lg font-semibold">   {message.property.name}</h3>
          </Link>
          <div className=" overflow-hidden mb-2 ">
            <p className="text-gray-500 inline-block text-sm">{message?.text}</p>
          </div>
          <ul className="flex gap-1 flex-col">
            <li>
              <strong>Name:</strong> <p className="text-gray-500 inline-block text-sm">{message.name}</p>
            </li>
            <li>
              <strong>Email:</strong> <p className="text-gray-500 inline-block text-sm">{message.email}</p>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <LinkAnt  href={`tel:+${message.phone.code}${message.phone.number}`}>
        
                  +{message.phone.code}-{message.phone.number}
       
              </LinkAnt>
            </li>
            <li>
              <strong>Recived:</strong> <p className="text-gray-500 inline-block text-sm">{formattedDate}</p>
            </li>
          </ul>
          <Flex className="mt-4" gap={16}>
            <ReadMessage id={message.id}  readByOwner={message.readByOwner} />
            <DeleteMessage messageApi={messageApi} id={message.id} readByOwner={message.readByOwner} />
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default MessageUI;

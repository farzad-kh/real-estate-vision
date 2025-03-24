"use client";
import { Flex, Tag, Typography } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
const { Text} = Typography;
dayjs.extend(relativeTime);
const BookingMessages = ({ messages }) => {
  const [isNew, setIsNew] = useState({});
  useEffect(() => {
    setIsNew((prev) => {
      const newMessagesState = { ...prev };
      messages.forEach((msg) => {
        if (msg.notified) {
          newMessagesState[msg.id] = true;
        }
      });
      return JSON.stringify(newMessagesState) === JSON.stringify(prev)
        ? prev
        : newMessagesState;
    });
  }, [messages]);
  

  return (
    <>
      {messages?.map((msg) => (
        <div
          key={msg.id}
          className="p-4 border border-gray-300 rounded-lg bg-white md:text-sm relative"
        >
          {isNew[msg?.id] && (
            <span className="w-[6px] h-[6px] bg-red-500 rounded-full absolute left-[6px] top-[8px] pointer-events-none"></span>
          )}
          <Flex justify="space-between">
            <Tag
              className="!py-[2px] !px-2"
              color={msg.readBySender ? "blue" : ""}
            >
              {msg.readBySender ? "Read" : "Unread"}
            </Tag>
            {msg.readBySender && (
              <Text className="font-semibold">
                 {dayjs(msg.readAt).fromNow()}
              </Text>
            )}
          </Flex>
    
          <Link   href={`/property/${msg.propertyId}`} className="my-4  max-md:px-0 px-2 inline-block w-full  ">
            <Image
              src={msg.property.images[0]}
              alt="Property image"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-md w-full h-full aspect-[16/10] "
            />
          </Link>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Link
                href={`/property/${msg.propertyId}`}
                className="text-lg max-md:text-base text-bluePrimery"
              >
                {msg.property.name}
              </Link>
            </div>

            <p>
              <strong>Email sent: </strong>
              <Text type="secondary">{msg.email}</Text>
            </p>

            <p>
              <strong>Phone sent: </strong>
              <Text type="secondary">
                {msg.phone.code}-{msg.phone.number}
              </Text>
            </p>

            <p className="">
              <strong>Sent date: </strong>
              <Text type="secondary">
              {dayjs(msg.createdAt).format("MMMM D YYYY")}
              </Text>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookingMessages;

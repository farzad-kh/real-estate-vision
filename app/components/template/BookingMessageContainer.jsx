"use client";
import React, { useEffect } from "react";
import BookingMessages from "../module/BookingMessages";
import { singelImageFilter } from "@/app/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaRegMessage } from "react-icons/fa6";

import { useMessageReadStatusContext } from "@/app/context/MessageReadStatusContext";
import TabsUI from "../UI/TabsUI";
import PaginationUI from "../UI/PaginationUI";
const BookingMessageContainer = ({ messageSent,messageSentCount,pageSize,statusParams}) => {
  const messages = singelImageFilter(messageSent);

  const queryClient = useQueryClient();
  const { setNotif } = useMessageReadStatusContext();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch("/api/notifications");

      return res.data;
    },
    onMutate: () => setNotif(false),
    onSuccess: () => setNotif(false),
    onSettled: () => queryClient.invalidateQueries(["notification"]),
  });

  useEffect(() => {
    mutate();
  }, []);
  const items = [
    { key: "1", label: "All" },
    { key: "2", label: "Reviewed", status: "reviewed" },
    { key: "3", label: "Unreviewed", status: "unreviewed" },
  ];

  if (messageSentCount === 0 && !statusParams)
    return (
      <div className="w-full  justify-center items-center flex max-md:mt-11">
        <div className="flex flex-col gap-4 items-center">
          <div>
            <FaRegMessage className="text-xl" />
          </div>
          <p>You haven't sent any messages!</p>
        </div>
      </div>
    );
 
 

  return (
    <section className="w-full">
      <div className="w-full relative">
        <div className="flex justify-start gap-9 flex-col">
          <div className="mt-1">
            <h2 className="text-xl font-semibold mb-3">My Sent Messages</h2>
          </div>
          <TabsUI
            items={items}
            activeKey={"reviewed"}
            pathName={"messages-sent"}
          />
          {messages?.length <=0 
          ?
          <div>No messages in this category.</div>
:

          <div className="grid max-md:grid-cols-autofitbookmark grid-cols-2 max-lg:grid-cols-1 gap-4">
            <BookingMessages messages={messages} />
          </div>
          }
            <PaginationUI
              propertiesTotal={messageSentCount}
              pageSize={pageSize}
              />
        </div>
      </div>
    </section>
  );
};

export default BookingMessageContainer;

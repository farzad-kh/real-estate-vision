"use client";

import { useSession } from "next-auth/react";
import MessageContainerLoading from "../UI/loading/MessageContainerLoading";
import MessageUI from "../UI/MessageUI";
import { message as messageAnt } from "antd";
import { socket } from "@/socket";
import { useSearchParams } from "next/navigation";
import TabsUI from "../UI/TabsUI";
import { singelImageFilter } from "@/app/utils/helpers";
import { useMessage } from "@/app/hooks/useMessage";
import PaginationUI from "../UI/PaginationUI";
import { useState,useEffect } from "react";

const MessageContainer = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const hasFilter = searchParams.get("status");
  const pageSize = 3;

  const params = new URLSearchParams(searchParams);

  const queryString = params.toString();
  const query = params.size > 0 ? "?" + queryString : "";
  const [realTimeMessage, setRealTimeMessage] = useState(undefined);
  const [messageApi, contextHolder] = messageAnt.useMessage();

  useEffect(() => {
    if (!socket || socket === null) return;
    if (!session?.user.id) return;

    socket.emit("join", session?.user?.id);

    socket.on("new_message", ({ message }) => {
      console.log("soket", message);
      setRealTimeMessage(message);
    });

    return () => {
      socket.off("new_message");
    };
  }, [session?.user.id]);

  const { data: message = [], isLoading } = useMessage(
    session,
    query,
    realTimeMessage,
    queryString
  );
  console.log(message);

  const messages = singelImageFilter(message?.messageData) ?? [];

  const items = [
    { key: "1", label: "All" },
    { key: "2", label: "Read", status: "read" },
    { key: "3", label: "Unread", status: "unread" },
  ];

  if (isLoading || !message?.messageData) {
    return <MessageContainerLoading />;
  }

  if ((!messages || messages.length === 0) && !hasFilter) {
    return (
      <div className="text-center  mt-11 text-xl font-semibold">
        <p>You don't have any message</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full relative">
        <div className="flex justify-start gap-9 flex-col">
          <div className="flex justify-between pr-4 mt-1">
            <h2 className="text-xl font-semibold mb-3">My Messages</h2>
          </div>

          <TabsUI items={items} activeKey={"read"} pathName={"/message"} />

          {messages.length <= 0
            ? "No messages in this category."
            : messages.map((item) => (
                <MessageUI
                  key={item.id}
                  message={item}
                  messageApi={messageApi}
                />
              ))}

          <PaginationUI
            propertiesTotal={message.messageTotal}
            pageSize={pageSize}
          />
        </div>
      </div>
      {contextHolder}
    </section>
  );
};

export default MessageContainer;

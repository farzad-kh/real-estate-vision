import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const HasSentMessageSuccessfully = ({ hasSentMessage, id }) => {
  const [formatUpdate, setFormatUpdate] = useState(undefined);
  const getTimeReadMeesage = async () => {
    if (!hasSentMessage) return null;

    const res = await axios.get(`/api/messages/userStatus?propertyId=${id}`);
    return res.data;
  };
  const { data: messageStatus, isLoading } = useQuery({
    queryKey: ["messageStatus", id],
    queryFn: getTimeReadMeesage,
    retry: 2,
    enabled: hasSentMessage,
  });


  useEffect(() => {
    const readAt = messageStatus?.readAt;
    if (hasSentMessage && readAt) {
      const formattedRelative = dayjs(readAt).fromNow();
      setFormatUpdate(formattedRelative);
    }
  }, [messageStatus]);
  
  return (
    <>
      {isLoading ? (
        <div className="text-center  p-4 bg-gray-50 rounded-md">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : messageStatus?.readBySender ? (
        <div className="text-center  p-4 bg-sky-50 rounded-md">
          <p>Your message was seen by the owner</p>
          <p className="font-semibold">{formatUpdate}</p>
        </div>
      ) : (
        <div className="text-center p-4 bg-gray-100 rounded-md">
          <p>You have already sent a message for this property.</p>
          <p>The owner will contact you if they are interested.</p>
        </div>
      )}
    </>
  );
};

export default HasSentMessageSuccessfully;

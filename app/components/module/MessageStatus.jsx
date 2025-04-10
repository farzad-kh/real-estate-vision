import { useMessageStatusContext } from "@/app/context/MessageStatusContext";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { GoMail } from "react-icons/go";
import { socket } from "@/socket";
const MessageStatus = ({ responsive, onClose }) => {
  const { data: session, status } = useSession();

  const getUnreadMessage = async () => {
    const res = await axios.get("/api/messages/unread");
    return res.data;
  };
  const { count, setCount } = useMessageStatusContext();

  const { data: messages } = useQuery({
    queryKey: ["unreadMessage"],
    queryFn: getUnreadMessage,
    retry: 2,
    //  staleTime: 1000 * 60 * 5,
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    if (!session?.user.id) return;

    socket.emit("join", session.user.id);
    console.log("joined socket with ID:", session.user.id);

    socket.on("new_message", ({ unreadCount }) => {
      console.log("🔥 new message received:", unreadCount);
      setCount(unreadCount);
    });

    return () => {
      socket.off("new_message");
    };
  }, [session?.user.id]);

  useEffect(() => {
    if (!messages) return;

    setCount(messages);
  }, [messages]);

  return (
    <>
      {responsive ? (
        <Link
          onClick={onClose}
          className="gap-x-4 items-center flex"
          href="/message"
        >
          <Badge overflowCount={9} offset={[2, 1]} count={count || 0}>
            <GoMail className={`self-center  mt-[3px]  text-[18px] `} />
          </Badge>
          messages
        </Link>
      ) : (
        <Link className="mt-2 mr-1 max-md:hidden" href="/message">
          <Badge overflowCount={9} count={count || 0}>
            <GoMail
              className={`self-center mr-[2px] max-sm:text-[18px] text-[22px] `}
            />
          </Badge>
        </Link>
      )}
    </>
  );
};

export default MessageStatus;

// import { useMessageStatusContext } from "@/app/context/MessageStatusContext";
// import { useQuery } from "@tanstack/react-query";
// import { Badge } from "antd";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { BsBell } from "react-icons/bs";
// const MessageStatus = () => {
//   const { count, setCount } = useMessageStatusContext();

//   // const { data: unreadMessagesCount, refetch } = useQuery({
//   //   queryKey: ["unredMessage"],
//   //   queryFn: getUnreadMessage,

//   //   retry: 2,
//   // });

//   useEffect(() => {
//     const getUnreadMessage = async () => {
//       const res = await axios.get("/api/messages/unread");
//       setCount(res.data);

//       return res.data;
//     };

//     getUnreadMessage();
//   }, [count]);
//   console.log(count);
//   // useEffect(()=>{
//   // setCount(unreadMessagesCount)
//   // },[count])
//   // console.log(unreadMessagesCount);

//   // const { count,setCount } = useMessageStatusContext();

//   // setCount(2+2)
//   // console.log("Updated Count:", count);

//   //   useEffect(() => {
//   //     setMessageStatus(unreadMessagesCount - count);
//   //   }, [count, unreadMessagesCount]);
//   // console.log(messageStatus);

//   return (
//     <>
//       <a className="mt-2" href="#">
//         <Badge count={count}>
//           <BsBell className="text-xl self-center" />
//         </Badge>
//       </a>
//     </>
//   );
// };

// export default MessageStatus;

"use client"
import React from "react";
import { useSession } from "next-auth/react";
import { Flex, Skeleton } from "antd";
import Navbar from "./Navbar";

import LoginButton from "../shared/LoginButton";
import MessageStatus from "./MessageStatus";

const AuthStatus = ({notifications}) => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <Skeleton.Avatar active="true" size={"default"} shape={"circle"} />;
  return (
    <>
      {status === "authenticated" ? (
        <Flex align="center" gap={6}>
          <MessageStatus  />
          <Navbar notifications={notifications} session={session} />
        </Flex>
      ) : (
   <div className="mt-1">
         <LoginButton>Log in</LoginButton> 
   </div>
      )}
    </>
  );
};

export default AuthStatus;

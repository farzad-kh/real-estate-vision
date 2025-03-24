"use client";
import { createContext, useContext, useState } from "react";

const MessageReadStatusContext = createContext(null);
 
export const MessageReadStatusProvider = ({ children }) => {
  const [notif, setNotif] = useState(false);

  return (
    <MessageReadStatusContext.Provider value={{notif, setNotif}}>
     
      {children}
    </MessageReadStatusContext.Provider>
  );
};

export const useMessageReadStatusContext = () =>
  useContext(MessageReadStatusContext);

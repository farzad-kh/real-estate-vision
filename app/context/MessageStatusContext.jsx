"use client";
import { createContext, useContext, useState } from "react";

const MessageStatusContext = createContext(null);

export const MessageStatusProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <MessageStatusContext.Provider value={{ count, setCount }}>
      {children}
    </MessageStatusContext.Provider>
  );
};

export const useMessageStatusContext = () => useContext(MessageStatusContext);

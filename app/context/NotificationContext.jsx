"use client"
import { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({ status, type }) => {
  setTimeout(()=>
  
  api[type]({
    description: status,
    duration: 3,
    placement: "topRight",
  }),500)
  };

  return (
    <NotificationContext.Provider value={openNotification}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);

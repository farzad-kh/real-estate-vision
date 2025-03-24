"use client";

import React from "react";

import SidebarUI from "../components/UI/SidebarUI";
import { usePathname } from "next/navigation";
import { NotificationProvider } from "../context/NotificationContext";
import { MessageStatusProvider } from "../context/MessageStatusContext";

const Layout = ({ children }) => {
  const pathname = usePathname();

  const noLayoutRoutes = ["/dashboard/properties/new", "/edit"];

  const editRoute = pathname.split("/")[4];
  

  if (noLayoutRoutes.includes(pathname) || editRoute === "edit") {
    return <>{children}</>; // layout not showing in new rout (url)
  }

  return (
   
 
        <div className="transition-all grid max-lg:grid-cols-[260px_repeat(1,_1fr)] max-md:grid-cols-1 grid-cols-[300px_repeat(1,_1fr)] gap-6 max-w-screen-xl m-auto">
          {/* Aside Navigation */}
          <SidebarUI />
          {/* Main Content */}
          {children}
        </div>
 
  
  );
};

export default Layout;

"use client";
import { Tabs } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const TabsUI = ({ items, activeKey,pathName }) => {
 
  
  const router = useRouter();
  const searchParams = useSearchParams();
   const pathNames=usePathname()
  console.log(pathNames);
  
  const statusParams = searchParams.get("status");
  
  const onChange = (key) => {
    const [labelArr] = items.filter((item) => (item.key === key ? item : ""));
    const statusParamsItems = labelArr.status;
    
    const newFilter = statusParamsItems;

    const params = new URLSearchParams(searchParams);
    params.delete("page")
    !newFilter ? params.delete("status") : params.set("status", newFilter);
    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push(pathName + query);
  };
  return (
    <>
      <Tabs
        activeKey={!statusParams ? "1" : statusParams === activeKey ? "2" : "3"}
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default TabsUI;

"use client"
import React from "react";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const PaginationUI = ({propertiesTotal,pageSize}) => {
  const pageCount = Math.ceil(propertiesTotal / pageSize);
  if (pageCount <= 1) return null;
    
  const searchParams = useSearchParams();
  
  const router = useRouter();
  const path = usePathname();
  const curentPage = Number(searchParams.get("page")) || 1;
  const onChange = (page) => {
    
    const params = new URLSearchParams(searchParams);
    page > 1 ? params.set("page", page) : params.delete("page");
    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push(path + query);
  window.scrollTo({ top: 0, behavior: "smooth" })
  };
  
  return (
    <div className="mt-10">
      <Pagination
        onChange={onChange}
        align="center"
        responsive={false}
        showLessItems={true}
        pageSize={pageSize}
        current={curentPage}
        total={propertiesTotal}
      />
    </div>
  );
};

export default PaginationUI;

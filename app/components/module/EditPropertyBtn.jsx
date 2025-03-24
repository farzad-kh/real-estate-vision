"use client"
import React from "react";
import { useRouter } from "next/navigation";
import {
    EditOutlined,

  } from "@ant-design/icons";
const EditPropertyBtn = ({id}) => {
    const router = useRouter();
  return (
    <button
      role="link"
      aria-label="edit property"
      onClick={() => router.push(`/dashboard/properties/${id}/edit`)}
      className="bg-[#525c63] hover:bg-[#3f474c] py-[10px] px-4 rounded-md  transition-colors flex items-center gap-1 border  w-full text-sm text-center  text-white "
    >
      {" "}
    
    <p className="text-center w-full">  <EditOutlined key="edit" />  Edit</p>
    </button>
  );
};

export default EditPropertyBtn;

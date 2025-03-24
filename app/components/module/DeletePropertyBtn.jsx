"use client";
import React, { useState } from "react";

import axios from "axios";
import ModalUI from "../UI/ModalUI";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { message } from "antd";

const DeletePropertyBtn = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const router = useRouter();
  const [_, contextHolder] = message.useMessage();
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const res = await axios.delete(`/api/properties/${id}`);

      if (res.status === 203) {
        setOpen(false);
        setConfirmLoading(false);

        message.success(res?.data.message);
        router.push("/dashboard/properties");
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting property:", error);

      message.error(error?.response?.data.error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={showModal}
        className="flex items-center gap-1 border py-[10px] px-4   rounded-md h-  text-sm w-full  !text-red-500  bg-[#f5f5f5] hover:bg-[#fff3f3] transition-colors "
      >
       <p className="text-center w-full">
       <DeleteOutlined /> Delete
       </p>
      </button>

      <ModalUI
        title="Delete Property"
        open={open}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
        okText="Delete"
        handleCancel={handleCancel}
        cancelText="Cancel"
        okType="danger"
        maskClosable={handleCancel}
      >
        <p>
          Are you sure you want to delete this property? This action cannot be
          undone.
        </p>
      </ModalUI>
      {contextHolder}
    </div>
  );
};

export default DeletePropertyBtn;

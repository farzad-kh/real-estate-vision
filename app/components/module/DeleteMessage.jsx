import { useMessageStatusContext } from "@/app/context/MessageStatusContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";

const DeleteMessage = ({ id, messageApi, readByOwner }) => {
  const [loading, setLoading] = useState(false);
 
  const queryClient = useQueryClient();
  const {setCount } = useMessageStatusContext();
  const deleteHandler = async (id) => {
    setLoading(true);
      const res = await axios.delete("/api/messages", { data: { id } });
      return res.data;
  
  };
  const { mutate, isPending } = useMutation({
    mutationFn: deleteHandler,
    onSettled: () => {

      queryClient.invalidateQueries(["message"]);
      queryClient.invalidateQueries(["unredMessage"]);
      setTimeout(
        () =>
          messageApi.open({
            type: "success",
            content: "Message deleted",
          }),
        500
      );
      if (!readByOwner) setCount((prev) => Math.max(prev - 1, 0)); //prevent number becomes negative
 
    },
    onError: () => {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Failed to delete message",
      });
    },
  });

  return (
    <>
      <Button
        className="max-sm:w-1/2"
        loading={isPending || loading}
        onClick={() => mutate(id)}
        danger
      >
        delete
      </Button>
    </>
  );
};

export default DeleteMessage;

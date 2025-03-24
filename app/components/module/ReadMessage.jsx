import { useMessageStatusContext } from "@/app/context/MessageStatusContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";

const ReadMessage = ({ id, readByOwner }) => {
  const [disabel, setDisabel] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { count, setCount } = useMessageStatusContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch("/api/messages/read", { id });

      return res.data;
    },
    onSuccess: () => {
      setDisabel(true);

      setCount((prev) => Math.max(prev - 1, 0)); //prevent number becomes negative
      queryClient.invalidateQueries(["message"]);
      queryClient.invalidateQueries(["unredMessage"]);
      // queryClient.invalidateQueries(["notification"]);
    },
  });

  return (
    <>
      {readByOwner || disabel ? (
        <Button className="max-sm:w-1/2" disabled>
          Mark as read
        </Button>
      ) : (
        <Button
          className="max-sm:w-1/2"
          loading={isPending}
          type="primary"
          onClick={() => mutate()}
        >
          Mark as read
        </Button>
      )}
    </>
  );
};

export default ReadMessage;

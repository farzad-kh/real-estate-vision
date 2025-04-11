import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetMessageStatus = ({ id, hasSentMessage }) => {
  const getTimeReadMeesage = async () => {
    if (!hasSentMessage) return null;

    const res = await axios.get(`/api/messages/userStatus?propertyId=${id}`);
    return res.data;
  };
  return useQuery({
    queryKey: ["messageStatus", id],
    queryFn: getTimeReadMeesage,
    retry: 2,
    enabled: hasSentMessage,
  });
};

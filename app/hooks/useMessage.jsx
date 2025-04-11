import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export const useMessage = (session,query,queryString,realTimeMessage) => {
  const getMessage = async () => {
    const res = await axios.get(`/api/messages${query}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["message",queryString,realTimeMessage],
    queryFn: getMessage,
    retry: 2,
     staleTime:1000 * 60 * 5,
    enabled: !!session?.user.id,
  });
};

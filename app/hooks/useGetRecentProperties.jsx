import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export const useGetRecentProperties = () => {
  const getRecentProperties = async () => {
    const res = await axios.get(`/api/properties/recent`);
    return res.data;
  };
  return useQuery({
    queryKey: ["recentProperty"],
    queryFn: getRecentProperties,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};

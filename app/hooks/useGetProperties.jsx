 
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export const useGetProperties = ({ queryString,query}) => {
 
  const getProperties = async () => {
    const res = await axios.get(`/api/properties${query}`);
    return res.data;
  };
  return useQuery({
    queryKey: ["properties", queryString],
    queryFn: getProperties,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

 
"use client";
import { notFound, useSearchParams } from "next/navigation";

import ProppertieContainer from "./ProppertieContainer";


import LoadingProperties from "@/app/properties/loading";
import FilterContainer from "../module/FilterContainer";
import PaginationUI from "../UI/PaginationUI";
import { NotificationProvider } from "@/app/context/NotificationContext";
import { useGetProperties } from "@/app/hooks/useGetProperties";

const SearchContainer = () => {
const pageSize=12
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const queryString = params.toString();
  const query = params.size > 0 ? "?" + queryString : "";

  const { data, isFetching } = useGetProperties({ queryString, query });

  if (!isFetching && (!data?.properties || data.properties.length === 0)) {
  return notFound();
  }

  return (
    <>
      <FilterContainer />
      {isFetching ? (
        <LoadingProperties />
      ) : (
        <NotificationProvider>
          <ProppertieContainer properties={data.properties} />
          <PaginationUI propertiesTotal={data.propertiesTotal} pageSize={pageSize}/>
        </NotificationProvider>
      )}
    </>
  );
};

export default SearchContainer;

// "use client";
// import { useSearchParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useDebounce } from "use-debounce";
// import ProppertieContainer from "./ProppertieContainer";
// import LoadingProperties from "@/app/properties/loading";
// import FilterContainer from "../module/FilterContainer";
// import PaginationUI from "../UI/PaginationUI";

// const SearchContainer = ({ properties, propertiesTotal }) => {
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);
//   const queryString = params.toString();
//   // const query = params.size > 0 ? "?" + queryString : "";

//   const [debouncedQuery] = useDebounce(queryString, 200);

//   const getProperties = async () => {
//     const res = await axios.get(`/api/properties?${debouncedQuery}`);
//     return res.data;
//   };

//   const { data, isFetching } = useQuery({
//     queryKey: ["properties", debouncedQuery] ,
//     queryFn: getProperties,
//     retry: 2,
//      cacheTime:5000 * 10,
//      staleTime:0,
//     initialData: { properties: properties || [], propertiesTotal },
//     // placeholderData: (prev) => prev || { properties: [], propertiesTotal },
//   });

//   if (!isFetching && (!data?.properties || data.properties.length === 0)) {
//     return <div>Not Found</div>;
//   }

//   return (
//     <>
//       <FilterContainer />
//       {isFetching ? (
//         <LoadingProperties />
//       ) : (
//         <>
//           <ProppertieContainer properties={data.properties} />
//           <PaginationUI propertiesTotal={data.propertiesTotal || propertiesTotal} />
//         </>
//       )}
//     </>
//   );
// };

// export default SearchContainer;

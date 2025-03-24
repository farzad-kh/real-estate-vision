"use client"
import React, { useState } from "react";

import { Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortProperty = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const sortByParams = searchParams.get("sortBy") || undefined;
  const [selectVal, setSelectVal] = useState(sortByParams);
  console.log(sortByParams);

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    setSelectVal(value);

    value !== "" ? params.set("sortBy", value) : params.delete("sortBy");

    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push(path + query);
  };
  const options = [
    {
      value: "",
      label: "Newst",
    },
    {
      value: "high_price",
      label: "High price",
    },
    {
      value: "low_price",
      label: "Low price",
    },
  ];

  return (
    <Select
      size="large"
      value={selectVal || ""}
      style={{
        width: "120px",
      }}
      onChange={handleChange}
      options={options}
    />
  );
};

export default SortProperty;

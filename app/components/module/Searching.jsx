"use client";
import React, { useState } from "react";

import SelectUi from "../UI/SelectUi";
import { Flex, Input } from "antd";
import {useRouter, useSearchParams } from "next/navigation";

const Searching = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectVal, setSelectVal] = useState("");
const option= [
  {
    value: "",
    label: "All",
  },

  {
    value: "apartment",
    label: "Apartment",
  },
  {
    value: "villa",
    label: "Villa",
  },
  {
    value: "cabin",
    label: "Cabin",
  },
  {
    value: "lodge",
    label: "Lodge",
  },
  {
    value: "farmhouse",
    label: "Farmhouse",
  },
  {
    value: "house",
    label: "House",
  },
]
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    searchQuery ? params.set("q", searchQuery) : params.delete("q");
    selectVal ? params.set("type", selectVal) : params.delete("type");

    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push("/search" + query);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full bg-white/20 p-4 rounded-lg flex gap-4 ">
      <div className="max-md:w-full w-full max-sm:flex-col gap-3 flex ">
        <Flex className="w-full sm:max-w-[30%]">
          <SelectUi setSelectVal={setSelectVal} selectVal={selectVal} options={option} />
        </Flex>
        <Flex className=" w-full sm:max-w-[70%] placeholder:max-md:text-sm">
          <Input
        size="large"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country, city or stay"
          />
          
        </Flex>
        <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
       Search
      </button>
      </div>
    
    </form>
  );
};

export default Searching;

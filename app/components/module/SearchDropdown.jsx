"use client";
import { AutoComplete, Input, Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import {
  EnvironmentOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const SearchDropdown = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQ = searchParams.get("q") || null;
  const [value, setValue] = useState(searchQ);
  const [inputFocused, setInputFocused] = useState(false);
  const path = usePathname();

  const popularCountries = [
    {
      label: "Most Visited",
      options: [
        {
          value: "United States",
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <EnvironmentOutlined />
              United States
            </div>
          ),
        },
        {
          value: "united kingdom",
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <EnvironmentOutlined />
              United Kingdom
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    path !== "/search" ? setValue(null) : setValue(searchQ);
  }, [path]);
  // Filter countries based on user input
  const getFilteredOptions = useCallback(
    (inputValue) => {
      if (!inputValue) return popularCountries;

      const filteredOptions = ["France", "Spain", "Iran"]
        .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
        .map((item) => ({
          value: item,
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <EnvironmentOutlined />
              {item}
            </div>
          ),
        }));

      return [
        ...popularCountries,
        {
          label: "Other Countries",
          options: filteredOptions,
        },
      ];
    },
    [popularCountries]
  );

  // Store input value without losing focus
  const handleSearch = (inputValue) => {
    setValue(inputValue);
  };

  // When a user selects an option
  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
    updateQuery(selectedValue);
  };

  // When enter is pressed or the search button is clicked
  const handleSearchClick = () => {
    if (!value) return;
    if (value.trim()) {
      updateQuery(value);
    }
  };

  const handlePressEnter = () => {
    if (!value) return;
    if (value.trim()) {
      updateQuery(value);
    }
  };

  const updateQuery = (queryValue) => {
    const params = new URLSearchParams(searchParams);

    queryValue ? params.set("q", queryValue.toLowerCase()) : params.delete("q");
    params.delete("page");
    const query = params.size > 0 ? "?" + params.toString() : "";
    router.push("/search" + query);
  };

  const handleClear = () => {
    setValue("");
    updateQuery("");
  };
  if (path === "/") return null;
  return (
    <div className="w-full relative justify-end flex auto_complete_ant">
      <AutoComplete
        //  size="large"
        style={{ maxWidth: 400, width: "100%" }}
        dropdownStyle={{ marginTop: 8 }}
        options={getFilteredOptions(value)}
        value={value}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <Input
            className="!bg-[#f5f5f5] placeholder:max-md:text-sm"
            size="large"
            placeholder="Search country, city or stay"
            onPressEnter={handlePressEnter}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ paddingRight: value ? "30px" : "10px" }}
          />
          <div className="absolute right-[5px] top-[4px]">
            <Button
              className="!rounded-lg !h-[30px] !w-[30px]"
              type="text"
              icon={<SearchOutlined />}
              onClick={handleSearchClick}
            />
            {value && (
              <div className="min-h-[80%] w-[1px] bg-neutral-300 absolute right-[36px] top-[3px] " />
            )}
          </div>

          {value && (
            <CloseCircleOutlined
              onClick={handleClear}
              style={{
                position: "absolute",
                right: 48,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#aaa",
              }}
            />
          )}
        </div>
      </AutoComplete>
    </div>
  );
};

export default SearchDropdown;

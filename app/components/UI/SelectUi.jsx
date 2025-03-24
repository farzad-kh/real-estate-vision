"use client";

 

import { Select } from "antd";
const SelectUi = ({ setSelectVal, selectVal,options }) => {
  const handleChange = (value) => {
    setSelectVal(value);
  };
  return (
    <>
      <Select
        size="large"
        defaultValue={selectVal}
        style={{
          width: "100%",
        }}
        onChange={handleChange}
        options={options}
      />
    </>
  );
};

export default SelectUi;

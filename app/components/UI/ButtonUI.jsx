"use client";
import { Button } from "antd";
 
import { SearchOutlined } from "@ant-design/icons";
const ButtonUI = ({ widthButton }) => {
  return (
    <div className="absolute right-0">
      <Button
        icon={<SearchOutlined /> || ""}
        style={{ width: widthButton }}
        size="large"
        color="primary"
        type="primary"
      >
      </Button>
    </div>
  );
};

export default ButtonUI;

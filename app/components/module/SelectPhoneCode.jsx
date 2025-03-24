 
 
import { Form, Select, Space } from "antd";
import { Controller } from "react-hook-form";

const { Option } = Select;

const SelectPhoneCode = ({ name, control }) => {
  const phoneCode = [
    {
      title: "+1",
      value: "1",
      emoji: "🇺🇸",
    },
   
    {
      title: "+44",
      value: "44",
      emoji: "🇬🇧",
    },
    {
      title: "+34",
      value: "34",
      emoji: "🇪🇸",
    },
    
   
    {
      title: "+33",
      value: "33",
      emoji: "🇫🇷",
    },
    
    {
      title: "+98",
      value: "98",
      emoji: "🇮🇷",
    },
    
  ];

  return (
    <div>
      <Form.Item name="prefix" noStyle>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: 86 }}
              onChange={(value) => field.onChange(value)}
              placeholder="Code"
            >
              {phoneCode.map((item) => (
                <Option key={item.value} value={item.value}>
                  <Space>
                    <span role="img" aria-label={item.title}>
                      {item.emoji}
                    </span>
                    {item.title}
                  </Space>
                </Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>
    </div>
  );
};

export default SelectPhoneCode;

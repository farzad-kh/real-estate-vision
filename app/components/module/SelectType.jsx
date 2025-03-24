
import { Select, Space } from "antd";

 
import ControlledInput from "./ControlledInput";
const { Option } = Select;
const SelectType = ({ name, control, errors, label,  showSearch }) => {
  const optionType = [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "cabin", label: "Cabin" },
    { value: "lodge", label: "Lodge" },
    { value: "farmhouse", label: "Farmhouse" },
    { value: "house", label: "House" },
  ];
    const optionCountry = [
      {
        label: "United States",
        value: "united States",
        emoji: "🇺🇸",
      },
      
      {
        label: "United Kingdom",
        value: "united Kingdom",
        emoji: "🇬🇧",
      },
      
      {
        label: "France",
        value: "france",
        emoji: "🇫🇷",
      },
      
      {
        label: "Iran",
        value: "iran",
        emoji: "🇮🇷",
      },
      {
        label: "Spain",
        value: "spain",
        emoji: "🇪🇸",
      },
      
    ];
const option=label==="country"?optionCountry :optionType
  return (
    <>
      <ControlledInput
        errors={errors}
        label={label}
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            showSearch={showSearch}
            {...field}
            status={errors?.message && "error"}
            placeholder="Select type"
            onChange={(value) => field.onChange(value)}
          >
            {option?.map((item) => (
              <Option key={item.value} value={item.value}>
                <Space>
                  {item.emoji && (
                    <span role="img" aria-label={item.label}>
                      {item?.emoji}
                    </span>
                  )}
                  {item.label}
                </Space>
              </Option>
            ))}
          </Select>
        )}
      />
    </>
  );
};

export default SelectType;

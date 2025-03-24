import { Tag } from "antd";
 

const FilterPriceTag = ({ minPrice, maxPrice, setFilters, minTagKey, maxTagKey }) => {
  const clearPriceHandler = () => {
    setFilters((prev) => ({
      ...prev,
      [minTagKey]: 0,
      [maxTagKey]: 700,
    }));
  };

   
  if (!minPrice && (!maxPrice || maxPrice >= 700)) return null;

  return (
    <Tag
      className="!px-[8px] !py-[3px] !font-semibold !border-[#b0c9fa] !bg-[aliceblue] !text-sm"
      closable
      onClose={(e) => {
        e.preventDefault();
        clearPriceHandler();
      }}
    >
      ${minPrice || 0} - ${maxPrice ?? 700}
    </Tag>
  );
};

export default FilterPriceTag;

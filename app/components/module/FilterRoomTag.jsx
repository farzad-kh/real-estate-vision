import { Tag } from 'antd';
 

const FilterRoomTag = ({ tags, tagKey, setFilters }) => {
    if (!tags || tags === 1) return null;  

    return (
        <Tag
            className="!px-[8px] !py-[3px] !font-semibold !border-[#b0c9fa] !bg-[aliceblue] !text-sm"
            onClose={() => setFilters((prev) => ({ ...prev, [tagKey]: 1 }))}
            closable
        >
            {tagKey}: {tags}
        </Tag>
    );
};

export default FilterRoomTag;

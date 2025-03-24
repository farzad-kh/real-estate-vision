import { Tag } from 'antd';
import React from 'react';

const FilterAmenityTag = ({tags,tagKey,setFilters}) => {
    

    const removeTagsHandler=(e,item)=>{
        e.preventDefault();
        setFilters((prev) => ({
          ...prev,
          [tagKey]: prev[tagKey].filter(
            (amenity) => amenity !== item
          ),
        }));
    }
    return (
        <>
             {tags.map((item) => (
              <Tag
                className=" !px-[8px] !py-[3px] !font-semibold !border-[#b0c9fa] !bg-[aliceblue] !text-sm"
                key={item}
                closable
                onClose={(e)=>removeTagsHandler(e,item)}
              >
                {item}
              </Tag>
            ))}   
        </>
    );
};

export default FilterAmenityTag;
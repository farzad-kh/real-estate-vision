import { Checkbox } from "antd";


const FilterTypeCheckbox = ({ type = [], setFilters,filterKey ,rules}) => {
  const typeOptions = [
    { label: "Apartment", value: "apartment" },
    { label: "Villa", value: "villa" },
    { label: "Cabin", value: "cabin" },
    { label: "Lodge", value: "lodge" },
    { label: "Farmhouse", value: "farmhouse" },
    { label: "House", value: "house" },
  ];


 
  const ruleOptions = [
    { label: "Allow pets", value: "pets" },
    { label: "Allow children", value: "children" },
    { label: "Allow smoking", value: "smoking" },
    { label: "Allow events", value: "events" },
  ];


  const checkHandler = (checkedValues) => {
 
    setFilters((prev) => ({ ...prev, [filterKey]: checkedValues }));
  };

const optionFilter=rules ? ruleOptions : typeOptions
 
  return (
    <section className="flex flex-col gap-3 py-4">
      <div className="mb-4">
        <span className="font-semibold text-lg gradient_title">
          Accommodation type
        </span>
      </div>
      <Checkbox.Group value={type} onChange={checkHandler}>
        <div className="grid max-sm:grid-cols-1 grid-cols-4 w-full gap-y-3">
          {optionFilter.map((item) => (
            <div key={item.value} className="w-full flex flex-col">
              <Checkbox className="!scale-105 !text-black" value={item.value}>
                {item.label}
              </Checkbox>
            </div>
          ))}
        </div>
      </Checkbox.Group>
    </section>
  );
};

export default FilterTypeCheckbox;



// import { Checkbox } from "antd";
// import React from "react";

// const FilterTypeCheckbox = ({ type = [], setFilters, filterKey, rules = false }) => {
//   const typeOptions = [
//     { label: "Aparteman", value: "aparteman" },
//     { label: "Vila", value: "vila" },
//     { label: "Cabin", value: "cabin" },
//     { label: "Farmhouse", value: "farmhouse" },
//     { label: "House", value: "house" },
//   ];

//   const ruleOptions = [
//     { label: "Pets", value: "pets" },
//     { label: "Children", value: "children" },
//     { label: "Smoking", value: "smoking" },
//     { label: "Events", value: "events" },
//   ];

//   const checkHandler = (checkedValues) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterKey]: checkedValues,
//     }));
//   };

//   const optionFilter = rules ? ruleOptions : typeOptions;
//   const selectedValues = rules ? type || [] : type; // در صورتی که rules فعال باشد مقدار `rules` را دریافت کن

//   return (
//     <section className="flex flex-col gap-3 py-4">
//       <div className="mb-4">
//         <span className="font-semibold text-lg gradient_title">
//           {rules ? "Rules" : "Accommodation Type"}
//         </span>
//       </div>
//       <Checkbox.Group value={selectedValues} onChange={checkHandler}>
//         <div className="grid max-sm:grid-cols-1 grid-cols-3 w-full gap-y-3">
//           {optionFilter.map((item) => (
//             <div key={item.value} className="w-full flex flex-col">
//               <Checkbox className="!scale-105 !text-black" value={item.value}>
//                 {item.label}
//               </Checkbox>
//             </div>
//           ))}
//         </div>
//       </Checkbox.Group>
//     </section>
//   );
// };

// export default FilterTypeCheckbox;

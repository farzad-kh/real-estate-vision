"use client";
import React from "react";
import {  TimePicker } from "antd";
import ControlledInput from "./ControlledInput";
const TimePickerInput = ({ control, name, label ,errors}) => {
  // const timeD = new Date(time.$d).toISOString();
  return (
    <>
      <ControlledInput
        errors={errors}
        label={label}
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
      
            use12Hours
            format="h:mm A"
            onChange={(value) => field.onChange(value)}
            className="w-full"
            status={errors?.name && "error"}
            {...field}
          />
        )}
      />
    </>
  );
};

export default TimePickerInput;

// "use client"
// import React from 'react';
// import { Space, TimePicker } from 'antd';
// import ControlledInput from './ControlledInput';
// const TimePickerInput = (control,errors,name,label) => {
//     const onChange = (time, timeString) => {
//         console.log(time, timeString);
//       };
//     return (

//                <>
//       <ControlledInput

//         errors={errors}
//         label={label}
//         name={name}
//         control={control}
//         render={({ field }) => (
//             <TimePicker use12Hours onChange={onChange}
//             className="w-full"
//             status={errors?.message && "error"}
//             {...field}
//             />
//         )}
//       />
//     </>

//     );
// };

// export default TimePickerInput;

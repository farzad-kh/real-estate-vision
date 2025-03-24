// import React from "react";
// import { Form, Input, InputNumber} from "antd";
// import { Controller } from "react-hook-form";
// import SelectPhoneCode from "./SelectPhoneCode";

// const TextInput = ({
//   name,
//   control,
//   errors,
//   label,
//   type,
//   placeholder,
//   optional,
//   phone,
//   errorsPhone,
//   phoneName
// }) => {
//   return (
//     <>
//       <Form.Item
//         required={optional ? false : true}
//         validateStatus={
//           (errors && "error") || (errorsPhone?.message && "error")
//         }
//         help={errors?.message || errorsPhone?.message}
//         label={<span>{label}</span>}
//         style={{ width: "100%", marginBottom: 16 }}
//       >
//         <Controller
//           name={name}
//           control={control}
//           render={({ field }) =>
//             type === "number" ? (
//               <InputNumber
//                 keyboard={false}
//                 className="w-full"
//                 formatter={(value) =>
//                   `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 }
//                 status={errors?.rates && "error"}
//                 {...field}
//               />
//             ) : (
//               <Input
//                 addonBefore={
//                   phone && (
//                     <SelectPhoneCode
//                       name={phoneName}
//                       control={control}

//                     />
//                   )
//                 }
//                 status={errors?.message && "error"}
//                 {...field}
//                 placeholder={placeholder}
//               />
//             )
//           }
//         />
//       </Form.Item>
//     </>
//   );
// };

// export default TextInput;

 
import { Input, InputNumber } from "antd";

import SelectPhoneCode from "./SelectPhoneCode";
import ControlledInput from "./ControlledInput";

const TextInput = ({
  name,
  control,
  errors,
  label,
  type,
  placeholder,
  optional = false,
  phone = false,
  errorsPhone,
  phoneName,
  propertyMain,
}) => {
  return (
    <>
      <ControlledInput
        optional={optional}
        errors={errors}
        errorsPhone={errorsPhone}
        label={label}
        name={name}
        control={control}
        render={({ field }) =>
          type === "number" ? (
            propertyMain ? (
              <InputNumber
              
                status={errors?.message && "error"}
                keyboard={false}
                className="!w-full"
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <InputNumber
                keyboard={false}
                className="w-full"
                formatter={(value) =>
                  `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                status={errors?.rates && "error"}
                {...field}
              />
            )
          ) : (
            <Input
              addonBefore={
                phone && <SelectPhoneCode name={phoneName} control={control} />
              }
              status={errors?.message && "error"}
              {...field}
              placeholder={placeholder}
            />
          )
        }
      />
    </>
  );
};

export default TextInput;

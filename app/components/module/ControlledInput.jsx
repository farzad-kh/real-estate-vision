import { Form } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
const ControlledInput = ({
  optional,
  errors,
  errorsPhone,
  label,
  name,
  control,
  render,
  ...rest
}) => {
  return (
     
    <Form.Item
      required={optional ? false : true}
      validateStatus={(errors && "error") || (errorsPhone?.message && "error")}
      help={errors?.message || errorsPhone?.message}
      label={label ?
        <span>{label}</span>:null
      }
      style={{ width: "100%", marginBottom: 16 }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => render({ field, ...rest })}
      />
    </Form.Item>

    
  );
};

export default ControlledInput;

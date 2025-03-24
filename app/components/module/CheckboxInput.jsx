import React from "react";
import { Checkbox } from "antd";

import ControlledInput from "./ControlledInput";

const CheckboxInput = ({ control, label, title, name }) => {
  return (
    <>
      <ControlledInput
        optional
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          >
            {label}
          </Checkbox>
        )}
      />
    </>
  );
};

export default CheckboxInput;

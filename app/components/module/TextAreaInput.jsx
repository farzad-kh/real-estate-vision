 
import { Input} from "antd";
 
import ControlledInput from "./ControlledInput";

const TextAreaInput = ({ control, name, errors, label,  optional }) => {

  return (
    <>
      <ControlledInput
        optional
        errors={errors}
        label={label}
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            className="w-full"
            status={errors?.message && "error"}
            {...field}
          />
        )}
      />
    </>
  );
};

export default TextAreaInput;
 
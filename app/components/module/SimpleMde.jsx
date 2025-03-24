 
import SimpleMdeReact from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

import ControlledInput from "./ControlledInput";

const SimpleMde = ({ name, control, errors, label, placeholder }) => {
  const options = {
    toolbar: [
      "bold",
      "italic",
      "heading",
      "|",
      "unordered-list",
      "ordered-list",
      "|",
      "preview",
      "fullscreen",
      "undo",
    ],
    spellChecker: false,
    status: false,
  };

  return (
    <>
      <ControlledInput
      optional
        errors={errors}
        label={label}
        name={name}
        control={control}
        render={({ field }) => (
          <SimpleMdeReact
         
            options={options}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
    </>
  );
};

export default SimpleMde;

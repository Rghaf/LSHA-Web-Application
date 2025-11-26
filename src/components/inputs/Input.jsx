import InputLabel from "../InputLabel";
import CheckBox from "./Checkbox";

import Number from "./Number";
import Select from "./Select";
import File from "./File";
import Text from "./Text";

export default function Input({
  title,
  description,
  type,
  value,
  options,
  placeholder,
  disabled = false,
  required = false,
  handleChange,
  min,
  max,
}) {
  const divClassName =
    type === "checkbox" ? "flex items-center justify-between" : "";

  let content;

  if (type === "text") {
    content = (
      <Text
        name={title}
        id={title}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        handleChange={handleChange}
        required={required}
      />
    );
  } else if (type === "checkbox") {
    content = <CheckBox title={title} />;
  } else if (type === "number") {
    content = (
      <Number
        title={title}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    );
  } else if (type === "select" || type === "select-rs") {
    content = (
      <Select
        options={options}
        title={title}
        value={value}
        type={type}
        handleChange={handleChange}
      />
    );
  } else if (type === "file") {
    content = <File title={title} />;
  }

  return (
    <div className={divClassName}>
      <InputLabel title={title} description={description} type={type} />
      {content}
      {/* <span className="text-sm text-red-600">asdads</span> */}
    </div>
  );
}

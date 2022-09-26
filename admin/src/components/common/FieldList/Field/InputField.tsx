import { IField } from "./Field";
import { TextField } from "@mui/material";

const InputField: React.FC<IField> = ({
  form,
  name,
  label,
  type,
  disabled,
  inputOptions,
  error,
  errorMessage,
  defaultValue,
}) => {
  console.log(defaultValue);
  return (
    <TextField
      key={"field-" + name}
      fullWidth
      label={label}
      type={type}
      {...form.register(name, {
        ...inputOptions,
      })}
      error={error}
      helperText={errorMessage}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
};

export default InputField;

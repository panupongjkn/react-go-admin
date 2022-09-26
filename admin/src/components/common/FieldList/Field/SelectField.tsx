import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { IField } from "./Field";

const SelectField: React.FC<IField> = ({
  form,
  name,
  label,
  inputOptions,
  error,
  errorMessage,
  items,
  defaultValue,
}) => {
  return (
    <FormControl key={"field-" + name} fullWidth error={error}>
      <InputLabel id={"label-" + name}>{label}</InputLabel>
      <Select
        label={name}
        labelId={"label-" + name}
        {...form.register(name, {
          ...inputOptions,
        })}
        defaultValue={defaultValue}
      >
        {items?.map((item, index) => {
          return (
            <MenuItem key={"select-item-" + item.label} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;

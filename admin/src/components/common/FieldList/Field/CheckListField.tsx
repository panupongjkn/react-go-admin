import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

import { IField } from "./Field";
import { useEffect } from "react";

const CheckListField: React.FC<IField> = ({
  form,
  name,
  label,
  disabled,
  error,
  errorMessage,
  items,
  inputOptions,
}) => {
  useEffect(() => {
    if (inputOptions && inputOptions.atLeastOne) {
      form.register(name, { validate: atLeastOne });
    }
  }, []);

  const atLeastOne = (data: any) => {
    let isPass = false;
    data.forEach((isCkecked: boolean) => {
      if (isCkecked) {
        isPass = true;
      }
    });
    if (!isPass) {
      return inputOptions.atLeastOne;
    }
    return isPass;
  };

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      error={error}
      disabled={disabled}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {items?.map((item, index) => {
          return (
            <FormControlLabel
              key={`checkbox-${name}-${index}`}
              control={
                <Checkbox
                  {...form.register(`${name}[${index}]`)}
                  defaultChecked={item.checked}
                />
              }
              label={item.label}
            />
          );
        })}
      </FormGroup>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default CheckListField;

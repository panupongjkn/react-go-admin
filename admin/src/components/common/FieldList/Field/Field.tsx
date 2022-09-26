import { Box } from "@mui/material";
import CheckListField from "./CheckListField";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { UseFormRegister } from "react-hook-form";

export interface IField {
  fieldListType: "create" | "edit" | "detail";
  form: {
    register: UseFormRegister<any>;
  };
  error: boolean;
  errorMessage: string;
  label: string;
  type: string;
  name: string;
  defaultValue?: any;
  disabled?: boolean;
  inputOptions?: any;
  col?: number;
  items?: {
    label: any;
    value: any;
    checked?: boolean;
  }[];
}

const Field: React.FC<IField> = (props) => {
  switch (props.type) {
    case "check-list":
      return (
        <CheckListField
          {...props}
          disabled={props.fieldListType === "detail" ? true : props.disabled}
        />
      );
    case "select":
      return <SelectField {...props} />;
    case "box":
      return <Box></Box>;
    default:
      return (
        <InputField
          {...props}
          disabled={props.fieldListType === "detail" ? true : props.disabled}
        />
      );
  }
};

export default Field;

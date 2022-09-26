import { Box, Button, Divider, Grid, Paper } from "@mui/material";

import Field from "./Field";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

type TFiled = {
  label: string;
  type: string;
  name: string;
  defaultValue?: any;
  inputOptions?: any;
  col?: number;
  items?: {
    label: any;
    value: any;
    checked?: boolean;
  }[];
};
interface Props {
  type: "create" | "edit" | "detail";
  fields: TFiled[];
  onSubmit?: (data: any) => void;
  onBack: () => void;
}

const defaultOnSubmit = (data: any) => {
  console.log("data form: ", data);
};

const FieldList: React.FC<Props> = ({
  onSubmit = defaultOnSubmit,
  fields,
  type,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onConfirm = (data: any) => {
    Swal.fire({
      icon: "warning",
      html: `ต้องการ${type === "create" ? "สร้าง" : "แก้ไข"}ใช่ หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmit(data);
      }
    });
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit(onConfirm)}>
        <Box
          sx={{
            p: 2,
          }}
        >
          <Grid container spacing={2}>
            {fields.map((field, index) => {
              return (
                <Grid key={index + 1} item xs={field.col || 12}>
                  <Field
                    {...field}
                    fieldListType={type}
                    form={{
                      register,
                    }}
                    error={!!errors[field.name]}
                    errorMessage={errors[field.name]?.message as string}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Divider />
        <Footer type={type} onBack={onBack} />
      </form>
    </Paper>
  );
};

export default FieldList;

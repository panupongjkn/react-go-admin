import { Alert, Zoom } from "@mui/material";

import { toast } from "react-hot-toast";

const useAlert = () => {
  const onAlert = (
    type: "success" | "info" | "warning" | "error",
    message: string
  ) => {
    toast.custom((t) => (
      <Zoom in={t.visible}>
        <Alert severity={type}>{message}</Alert>
      </Zoom>
    ));
  };

  return {
    onAlert,
  };
};

export default useAlert;

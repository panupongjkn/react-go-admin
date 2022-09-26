import { Box, Button, Typography } from "@mui/material";
import { Edit, KeyboardReturn } from "@mui/icons-material";

import Swal from "sweetalert2";

interface Props {
  type: "create" | "edit" | "detail";
  onBack: () => void;
}
const Footer: React.FC<Props> = ({ type, onBack }) => {
  switch (type) {
    case "create":
      return (
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="button"
            variant="contained"
            size="large"
            color="error"
            onClick={onBack}
          >
            กลับ
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="success"
          >
            สร้าง
          </Button>
        </Box>
      );
    case "edit":
      return (
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="button"
            variant="contained"
            size="large"
            color="error"
            onClick={onBack}
          >
            <KeyboardReturn
              sx={{
                fontSize: 16,
                mr: 1,
              }}
            />
            <Typography>กลับ</Typography>
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="success"
          >
            <Edit
              sx={{
                fontSize: 16,
                mr: 1,
              }}
            />
            <Typography>แก้ไข</Typography>
          </Button>
        </Box>
      );
    default:
      return (
        <Box
          sx={{
            p: 2,
          }}
        >
          <Button
            type="button"
            onClick={onBack}
            variant="contained"
            size="large"
            color="error"
          >
            กลับ
          </Button>
        </Box>
      );
  }
};

export default Footer;

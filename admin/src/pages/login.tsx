import { Grid, Paper, TextField } from "@mui/material";

import { AuthServices } from "services";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ConfigApp from "configs/app";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import useAlert from "hooks/useAlert";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useToken from "hooks/useToken";
import withNotAuth from "hocs/withNotAuth";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { onAlert } = useAlert();
  const { setToken } = useToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    AuthServices.login({
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        setToken(res.data.token);
        onAlert("success", "Login success");
        navigate("/dashboard");
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
          maxWidth: "450px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {ConfigApp.app_name}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("email", { required: "กรุณากรอก email" })}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password", { required: "กรุณากรอกรหัสผ่าน" })}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              size="large"
            >
              Log In
            </Button>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
};

export default withNotAuth(Login);

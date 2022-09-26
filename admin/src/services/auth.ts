import axios from "axios";

const AuthService = axios.create({
  baseURL: `${process.env.REACT_APP_API}/auth`,
});

const AuthServices = {
  login: (data: { email: string; password: string }) =>
    AuthService.post("/login", data),
};

export default AuthServices;

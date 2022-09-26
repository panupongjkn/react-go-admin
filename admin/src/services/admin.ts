import { IPaginationRequest } from "interfaces/pagination";
import axios from "axios";

const AdminService = axios.create({
  baseURL: `${process.env.REACT_APP_API}/admin`,
});

const AdminServices = {
  getDetailByToken: (token: string) =>
    AdminService.get("/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getDetail: (token: string, id: string) =>
    AdminService.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delete: (token: string, id: string | number) =>
    AdminService.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getAll: (token: string, pagination: IPaginationRequest) =>
    AdminService.get(
      `/list?perPage=${pagination.per_page}&page=${pagination.page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  create: (
    token: string,
    data: {
      email: string;
      password: string;
      role: number;
    }
  ) =>
    AdminService.post(`/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  edit: (
    token: string,
    id: string | number,
    data: {
      email: string;
      password: string;
      role: number;
    }
  ) =>
    AdminService.put(`/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  changePassword: (
    token: string,
    data: {
      old_password: string;
      new_password: string;
      confirm_new_password: string;
    }
  ) =>
    AdminService.put(`/change-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default AdminServices;

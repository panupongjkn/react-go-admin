import { IPaginationRequest } from "interfaces/pagination";
import axios from "axios";

const RoleService = axios.create({
  baseURL: `${process.env.REACT_APP_API}/role`,
});

const RoleServices = {
  getDetail: (token: string, id: string) =>
    RoleService.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getAll: (token: string, pagination: IPaginationRequest) =>
    RoleService.get(
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
      name: string;
      code: string;
      permissions: number[];
    }
  ) =>
    RoleService.post(`/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  edit: (
    token: string,
    id: string | number,
    data: {
      name: string;
      code: string;
      permissions: number[];
    }
  ) =>
    RoleService.put(`/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delete: (token: string, id: string | number) =>
    RoleService.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default RoleServices;

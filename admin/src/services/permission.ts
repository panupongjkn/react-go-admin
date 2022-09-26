import { IPaginationRequest } from "interfaces/pagination";
import axios from "axios";

const PermissionService = axios.create({
  baseURL: `${process.env.REACT_APP_API}/permission`,
});

const PermissionServices = {
  getAll: (token: string, pagination: IPaginationRequest) =>
    PermissionService.get(
      `/list?perPage=${pagination.per_page}&page=${pagination.page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};

export default PermissionServices;

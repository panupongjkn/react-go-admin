export interface IUser {
  id: number;
  email: string;
  role: IRole;
}

export interface IRole {
  id: number;
  name: string;
  code: string;
  permissions: IPermission[];
}

export interface IPermission {
  id: number;
  name: string;
  code: TPermission;
}

export type TPermission = "MANAGE_ADMIN" | "MANAGE_USER";

import {
  AssignmentInd,
  Home,
  ManageAccounts,
  SupervisedUserCircle,
  VerifiedUser,
} from "@mui/icons-material";

import { ReactNode } from "react";
import SidebarDesktop from "./SidebarDesktop";
import SidebarMobile from "./SidebarMobile";
import { TPermission } from "interfaces/user";
import useResponsive from "hooks/useResponsive";

interface Props {
  drawerWidth: number;
  isOpen: boolean;
  toggleDrawer: (
    isOpen: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export interface IMenu {
  header?: string;
  permission?: TPermission;
  items: {
    icon: ReactNode;
    label: string;
    href?: string;
    permission?: TPermission;
    subMenu?: {
      icon: ReactNode;
      label: string;
      href: string;
      permission?: TPermission;
    }[];
  }[];
}

const menu: IMenu[] = [
  {
    items: [
      {
        icon: <Home />,
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: <ManageAccounts />,
        label: "Manage Admin",
        permission: "MANAGE_ADMIN",
        subMenu: [
          {
            icon: <SupervisedUserCircle />,
            label: "Admin",
            href: "/admin/list",
          },
          {
            icon: <AssignmentInd />,
            label: "Role",
            href: "/role/list",
          },
          {
            icon: <VerifiedUser />,
            label: "Permission",
            href: "/permission/list",
          },
        ],
      },
    ],
  },
  {
    header: "System",
    permission: "MANAGE_USER",
    items: [
      {
        icon: <SupervisedUserCircle />,
        label: "User",
        href: "/user/list",
      },
    ],
  },
];

const Sidebar: React.FC<Props> = ({ drawerWidth, isOpen, toggleDrawer }) => {
  return (
    <>
      {useResponsive("up", "lg") ? (
        <SidebarDesktop drawerWidth={drawerWidth} menu={menu} />
      ) : (
        <SidebarMobile
          drawerWidth={drawerWidth}
          menu={menu}
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
        />
      )}
    </>
  );
};

export default Sidebar;

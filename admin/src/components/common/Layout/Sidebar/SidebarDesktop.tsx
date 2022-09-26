import Content from "./Content/Content";
import Drawer from "@mui/material/Drawer";
import { IMenu } from "./Sidebar";
import { ReactNode } from "react";

interface Props {
  drawerWidth: number;
  menu: IMenu[];
}

const SidebarDesktop: React.FC<Props> = ({ drawerWidth, menu }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: `1px dashed rgba(145, 158, 171, 0.24)`,
          bgcolor: "background.default",
          zIndex: 999,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Content menu={menu} />
    </Drawer>
  );
};

export default SidebarDesktop;

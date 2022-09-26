import { Box } from "@mui/material";
import Content from "./Content/Content";
import Drawer from "@mui/material/Drawer";
import { IMenu } from "./Sidebar";

interface Props {
  drawerWidth: number;
  menu: IMenu[];
  isOpen: boolean;
  toggleDrawer: (
    isOpen: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const SidebarMobile: React.FC<Props> = ({
  drawerWidth,
  menu,
  isOpen,
  toggleDrawer,
}) => {
  return (
    <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: drawerWidth,
        }}
        role="presentation"
      >
        <Content menu={menu} />
      </Box>
    </Drawer>
  );
};

export default SidebarMobile;

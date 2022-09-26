import * as React from "react";

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";
import Toolbar from "@mui/material/Toolbar";
import useResponsive from "hooks/useResponsive";

interface Props {
  drawerWidth: number;
  toggleDrawer: (
    isOpen: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Navbar: React.FC<Props> = ({ drawerWidth, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        width: useResponsive("up", "lg")
          ? `calc(100% - ${drawerWidth}px)`
          : "100%",
        ml: `${drawerWidth}px`,
        border: "none",
        boxShadow: "none",
        height: "92px",
        verticalAlign: "center",
        background: "white",
      }}
    >
      <Box
        sx={{
          width: "100%",
          margin: "auto",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: useResponsive("up", "lg") ? "end" : "space-between",
          }}
        >
          {useResponsive("up", "lg") ? (
            <></>
          ) : (
            <IconButton onClick={toggleDrawer(true)} size="small">
              <MenuIcon />
            </IconButton>
          )}
          <Profile />
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;

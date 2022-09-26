import Box from "@mui/material/Box";
import { Card } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";

const drawerWidth = 280;

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(isOpen);
    };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
      <Sidebar
        drawerWidth={drawerWidth}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 5,
          minHeight: "100vh",
          pt: "92px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

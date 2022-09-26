import { Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Logout,
  Logout as LogoutIcon,
  Settings,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import useToken from "hooks/useToken";
import useUser from "hooks/useUser";

const Profile = () => {
  let navigate = useNavigate();
  const { user, onClearUser } = useUser();
  const { clearToken } = useToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    clearToken();
    onClearUser();
    navigate("/login");
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "12px",
            minWidth: "200px",
            overflow: "visible",
            boxShadow:
              "rgb(145 158 171 / 20%) 0px 0px 20px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              borderTop: "1px solid rgb(145 158 171 / 7%)",
              borderLeft: "1px solid rgb(145 158 171 / 7%)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/settings">
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;

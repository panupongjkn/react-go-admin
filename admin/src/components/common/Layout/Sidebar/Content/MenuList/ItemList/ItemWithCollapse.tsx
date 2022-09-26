import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

import Item from "./Item";
import { TPermission } from "interfaces/user";
import usePermission from "hooks/usePermission";

interface Props {
  icon: React.ReactNode;
  label: string;
  permission?: TPermission | undefined;
  subMenu: {
    icon: React.ReactNode;
    label: string;
    href: string;
    permission?: TPermission | undefined;
  }[];
}

const ItemWithCollapse: React.FC<Props> = ({
  icon,
  label,
  subMenu,
  permission,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { checkPermission } = usePermission();

  const isMatch = useMemo(() => {
    let match = false;
    subMenu.forEach((menu) => {
      if (!!matchPath(menu.href + "/*", pathname)) {
        match = true;
      }
    });
    return match;
  }, [pathname]);

  useEffect(() => {
    setOpen(isMatch);
  }, [isMatch]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          borderRadius: "8px",
          color: isMatch ? theme.palette.primary.main : "gray",
          mb: 1,
        }}
      >
        <ListItemIcon
          sx={{
            color: isMatch ? theme.palette.primary.main : "gray",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subMenu.map((sm, index) => {
          if (
            !sm.permission ||
            (sm.permission && checkPermission(sm.permission))
          ) {
            return <Item key={index} {...sm} isSub={true} />;
          } else {
            return <React.Fragment key={index}></React.Fragment>;
          }
        })}
      </Collapse>
    </>
  );
};
export default ItemWithCollapse;

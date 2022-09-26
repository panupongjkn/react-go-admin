import { Link, matchPath, useLocation } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

import { TPermission } from "interfaces/user";
import { useMemo } from "react";
import usePermission from "hooks/usePermission";

interface IItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isSub?: boolean;
  permission?: TPermission | undefined;
}

const Item: React.FC<IItem> = ({
  icon,
  label,
  href,
  isSub = false,
  permission,
}) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const isMatch = useMemo(() => {
    return !!matchPath(href + "/*", pathname);
  }, [href, pathname]);

  return (
    <Link to={href}>
      <List
        component="div"
        disablePadding
        sx={{
          mb: 1,
        }}
      >
        <ListItemButton
          selected={isMatch}
          sx={{
            pl: isSub ? 4 : 2,
            borderRadius: "8px",
            color: isMatch ? theme.palette.primary.main : "gray",
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
        </ListItemButton>
      </List>
    </Link>
  );
};
export default Item;

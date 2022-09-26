import { Box, Typography } from "@mui/material";

import { IMenu } from "../../Sidebar";
import ItemList from "./ItemList";
import React from "react";
import usePermission from "hooks/usePermission";

const MenuList: React.FC<IMenu> = ({ header, permission, items }) => {
  const { checkPermission } = usePermission();

  if (!permission || (permission && checkPermission(permission))) {
    return (
      <Box
        sx={{
          mb: 2,
        }}
      >
        {header && (
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              textTransform: "uppercase",
              mb: 1,
              pl: "8px",
            }}
          >
            {header}
          </Typography>
        )}
        {items.map((item, index) => {
          if (
            !item.permission ||
            (item.permission && checkPermission(item.permission))
          ) {
            return <ItemList key={index} {...item} />;
          } else {
            return <React.Fragment key={index}></React.Fragment>;
          }
        })}
      </Box>
    );
  } else {
    return <></>;
  }
};

export default MenuList;

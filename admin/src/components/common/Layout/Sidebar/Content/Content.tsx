import { Box, Toolbar, Typography } from "@mui/material";

import ConfigApp from "configs/app";
import { IMenu } from "../Sidebar";
import { Link } from "react-router-dom";
import MenuList from "./MenuList";

interface Props {
  menu: IMenu[];
}

const Content: React.FC<Props> = ({ menu }) => {
  return (
    <Toolbar>
      <Box sx={{ width: "100%" }}>
        <Toolbar
          style={{ padding: "8px 0px", height: "92px" }}
          component={Link}
          to={"/dasboard"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
                marginRight: "10px",
              }}
            />
            <Typography fontWeight={700}>{ConfigApp.app_name}</Typography>
          </Box>
        </Toolbar>
        <div>
          {menu.map((m, index) => (
            <MenuList key={index + 1} {...m} />
          ))}
        </div>
      </Box>
    </Toolbar>
  );
};

export default Content;

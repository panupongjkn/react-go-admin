import { Box, Breadcrumbs, Typography } from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  actions?: React.ReactNode[];
}
const Header: React.FC<Props> = ({ title, actions, breadcrumbs = [] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: actions ? "space-between" : "start",
        alignItems: "center",
        py: 4,
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight={700} sx={{ mb: "8px" }}>
          {title}
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <FiberManualRecordIcon
              sx={{
                fontSize: "6px",
                color: "text.disabled",
                mx: 1,
              }}
            />
          }
        >
          {breadcrumbs.map((breadcrumb, index) => {
            if (breadcrumb.href) {
              return (
                <Link key={"breadcrumb-" + (index + 1)} to={breadcrumb.href}>
                  <Typography
                    color="text.primary"
                    sx={[
                      {
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      },
                    ]}
                  >
                    {breadcrumb.label}
                  </Typography>
                </Link>
              );
            } else {
              return (
                <Typography
                  key={"breadcrumb-" + (index + 1)}
                  color="text.disabled"
                >
                  {breadcrumb.label}
                </Typography>
              );
            }
          })}
        </Breadcrumbs>
      </Box>
      {actions && (
        <div className="flex space-x-2">
          {actions.map((action, index) => {
            return <div key={`action-${index}`}>{action}</div>;
          })}
        </div>
      )}
    </Box>
  );
};

export default Header;

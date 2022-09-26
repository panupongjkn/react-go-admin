import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routers from "router";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "contexts/UserContext";

const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: "#2065D1",
    },
    text: {
      primary: "#212B36",
      disabled: "#919EAB",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 999,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontFamily: "Public Sans, sans-serif",
        },
        h4: {
          fontSize: 24,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "& fieldset": {
            borderColor: "rgb(145 158 171 / 20%)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          marginRight: "20px",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <UserContextProvider>
      <Toaster />
      <RouterProvider router={Routers} />
    </UserContextProvider>
  </ThemeProvider>
);

import { Navigate, createBrowserRouter } from "react-router-dom";

import AdminDetail from "pages/manage-admin/admin/detail";
import CreateAdmin from "pages/manage-admin/admin/create";
import CreateRole from "pages/manage-admin/role/create";
import Dashboard from "pages/dashboard";
import EditAdmin from "pages/manage-admin/admin/edit";
import EditRole from "pages/manage-admin/role/edit";
import Layout from "components/common/Layout";
import ListAdmin from "pages/manage-admin/admin/list";
import ListPermission from "pages/manage-admin/permission/list";
import ListRole from "pages/manage-admin/role/list";
import Login from "pages/login";
import RoleDetail from "pages/manage-admin/role/detail";
import Settings from "pages/settings";

const Routers = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/admin/list",
        element: <ListAdmin />,
      },
      {
        path: "/admin/create",
        element: <CreateAdmin />,
      },
      {
        path: "/admin/:id",
        element: <AdminDetail />,
      },
      {
        path: "/admin/:id/edit",
        element: <EditAdmin />,
      },
      {
        path: "/role/list",
        element: <ListRole />,
      },
      {
        path: "/role/create",
        element: <CreateRole />,
      },
      {
        path: "/role/:id",
        element: <RoleDetail />,
      },
      {
        path: "/role/:id/edit",
        element: <EditRole />,
      },
      {
        path: "/permission/list",
        element: <ListPermission />,
      },
    ],
  },
]);

export default Routers;

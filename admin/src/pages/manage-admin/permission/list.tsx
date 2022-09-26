import { IPagination, IPaginationRequest } from "interfaces/pagination";
import { IPermission, IUser } from "interfaces/user";
import { useEffect, useState } from "react";

import AdminServices from "services/admin";
import AvatarLetter from "components/common/AvatarLetter";
import { Box } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";
import Header from "components/common/Header";
import { Link } from "react-router-dom";
import PermissionServices from "services/permission";
import Swal from "sweetalert2";
import Table from "components/common/Table";
import Typography from "@mui/material/Typography";
import useAlert from "hooks/useAlert";
import useToken from "hooks/useToken";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

interface IPermissionData {
  id: number;
  name: string;
  code: string;
}

const ListPermission = () => {
  const { token } = useToken();
  const { onAlert } = useAlert();
  const [data, setData] = useState<{
    data: IPermissionData[];
    pagination: IPagination;
  }>({
    data: [],
    pagination: {
      page: 1,
      total_item: 0,
      total_page: 0,
    },
  });
  const [pagination, setPagination] = useState<IPaginationRequest>({
    page: 1,
    per_page: 10,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const fetchData = () => {
    PermissionServices.getAll(token as string, {
      per_page: pagination.per_page,
      page: pagination.page,
    })
      .then((res) => {
        let paginationRes: IPagination = res.data.pagination;
        setData({
          data: res.data.data.map((d: IPermission) => {
            return {
              id: d.id,
              name: d.name,
              code: d.code,
            };
          }),
          pagination: {
            page: paginationRes.page,
            total_item: paginationRes.total_item,
            total_page: paginationRes.total_page,
          },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  return (
    <>
      <Header
        title="Permission"
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Permission",
            href: "/permission/list",
          },
          {
            label: "List",
          },
        ]}
      />
      <Table
        headers={[
          {
            key: "name",
            label: "Permission name",
            render: (value) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AvatarLetter label={value} />
                <Typography sx={{ ml: 2 }}>{value}</Typography>
              </Box>
            ),
          },
          {
            key: "code",
            label: "Permission code",
          },
        ]}
        data={data.data}
        isLoading={isLoading}
        pagination={
          data.pagination
            ? {
                ...data.pagination,
                onChange: (page) =>
                  setPagination((pagination) => {
                    return {
                      ...pagination,
                      page,
                    };
                  }),
              }
            : undefined
        }
      />
    </>
  );
};

export default withAuth(withPermission(ListPermission, "MANAGE_ADMIN"));

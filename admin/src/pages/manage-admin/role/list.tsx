import { IPagination, IPaginationRequest } from "interfaces/pagination";
import { IPermission, IRole } from "interfaces/user";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import AvatarLetter from "components/common/AvatarLetter";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Header from "components/common/Header";
import RoleServices from "services/role";
import Swal from "sweetalert2";
import Table from "components/common/Table";
import Typography from "@mui/material/Typography";
import useAlert from "hooks/useAlert";
import useToken from "hooks/useToken";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

interface IRoleData {
  id: number;
  name: string;
  code: string;
}

const ListRole = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { onAlert } = useAlert();
  const [data, setData] = useState<{
    data: IRoleData[];
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
    RoleServices.getAll(token as string, {
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

  const onDelete = (item: IRole) => {
    Swal.fire({
      icon: "warning",
      html: `ต้องการลบตำแหน่ง <b>${item.name}</b> ใช่ หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        RoleServices.delete(token as string, item.id)
          .then((res) => {
            fetchData();
            onAlert("success", "ลบ Role สำเร็จ");
          })
          .catch((err) => {
            onAlert("error", err.response.data.message);
          });
      }
    });
  };

  return (
    <>
      <Header
        title="Role"
        actions={[
          <Link to="/role/create">
            <Button variant="contained" size="large">
              <AddIcon
                sx={{
                  fontSize: 14,
                  mr: 1,
                }}
              />
              <Typography>Create</Typography>
            </Button>
          </Link>,
        ]}
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Role",
            href: "/role/list",
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
            label: "Role name",
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
            label: "Role code",
          },
        ]}
        actions={{
          onDetail: (item: any) => navigate(`/role/${item.id}`),
          onEdit: (item: any) => navigate(`/role/${item.id}/edit`),
          onDelete: (item: any) => onDelete(item),
        }}
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

export default withAuth(withPermission(ListRole, "MANAGE_ADMIN"));

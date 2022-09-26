import { Box, Typography } from "@mui/material";
import { IPagination, IPaginationRequest } from "interfaces/pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import AdminServices from "services/admin";
import AvatarLetter from "components/common/AvatarLetter";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";
import Header from "components/common/Header";
import { IUser } from "interfaces/user";
import Swal from "sweetalert2";
import Table from "components/common/Table";
import useAlert from "hooks/useAlert";
import useToken from "hooks/useToken";
import useUser from "hooks/useUser";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

interface IUserData {
  id: number;
  email: string;
  role: string;
  role_code: string;
}

const ListAdmin = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { user } = useUser();
  const { onAlert } = useAlert();
  const [data, setData] = useState<{
    data: IUserData[];
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
    AdminServices.getAll(token as string, {
      per_page: pagination.per_page,
      page: pagination.page,
    })
      .then((res) => {
        let paginationRes: IPagination = res.data.pagination;
        setData({
          data: res.data.data.map((d: IUser) => {
            return {
              id: d.id,
              email: d.email,
              role: d.role.name,
              role_code: d.role.code,
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

  const onDelete = async (item: IUser) => {
    Swal.fire({
      icon: "warning",
      html: `ต้องการลบผู้ดูแล <b>${item.email}</b> ใช่ หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        AdminServices.delete(token as string, item.id)
          .then((res) => {
            fetchData();
            onAlert("success", "ลบผู้ดูแลสำเร็จ");
          })
          .catch((err) => {
            onAlert("error", err.response.data.message);
          });
      }
    });
  };

  if (user && !isLoading) {
    return (
      <>
        <Header
          title="Admin"
          actions={[
            <Link to="/admin/create">
              <Button variant="contained" size="large">
                <AddIcon
                  sx={{
                    fontSize: 14,
                    mr: 1,
                  }}
                />
                <Typography>Create</Typography>
              </Button>{" "}
            </Link>,
          ]}
          breadcrumbs={[
            {
              label: "Dashboard",
              href: "/dashboard",
            },
            {
              label: "Admin",
              href: "/admin/list",
            },
            {
              label: "List",
            },
          ]}
        />
        <Table
          headers={[
            {
              key: "email",
              label: "Email",
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
              key: "role",
              label: "Role name",
            },
            {
              key: "role_code",
              label: "Code",
            },
          ]}
          data={data.data}
          isLoading={isLoading}
          actions={{
            onEdit: (item: any) => navigate(`/admin/${item.id}/edit`),
            onDetail: (item: any) => navigate(`/admin/${item.id}`),
            others: [
              {
                icon: (item: any, index: number) => <Delete />,
                label: (item: any, index: number) => "Delete",
                onClick: (item) => onDelete(item),
                hidden: (item: any, index: number) => {
                  console.log(item.id, user?.id, item.id === user?.id);
                  return item.id === user?.id;
                },
              },
            ],
          }}
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
  }
};

export default withAuth(withPermission(ListAdmin, "MANAGE_ADMIN"));

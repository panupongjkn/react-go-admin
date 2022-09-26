import { IPermission, IUser } from "interfaces/user";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AdminServices } from "services";
import FieldList from "components/common/FieldList";
import Header from "components/common/Header";
import RoleServices from "services/role";
import useAlert from "hooks/useAlert";
import useToken from "hooks/useToken";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

type TEditAdmin = {
  email: string;
  password: string;
  role: number;
};

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();
  const { onAlert } = useAlert();

  const [admin, setAdmin] = useState<IUser | null>(null);
  const [roles, setRoles] = useState<
    {
      label: any;
      value: any;
    }[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    RoleServices.getAll(token as string, {
      page: 1,
      per_page: 100,
    }).then((res) => {
      setRoles(
        res.data.data.map((role: IPermission, index: number) => {
          return {
            label: `${role.name} (${role.code})`,
            value: role.id,
          };
        })
      );
    });
    AdminServices.getDetail(token as string, id as string)
      .then((res) => {
        setAdmin(res.data.data);
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  const onSubmit = (data: any) => {
    let dataProps: TEditAdmin = { ...data, role: parseInt(data.role) };
    AdminServices.edit(token as string, id as string, dataProps)
      .then((res) => {
        onAlert("success", "แก้ไข Admin สำเร็จ");
        navigate("/admin/list");
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  if (admin && roles) {
    return (
      <>
        <Header
          title="Edit Admin"
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
              label: admin?.email as string,
            },
          ]}
        />
        <FieldList
          type="edit"
          onSubmit={onSubmit}
          fields={[
            {
              label: "Email",
              type: "email",
              name: "email",
              inputOptions: {
                required: "กรุณากรอกอีเมล",
              },
              col: 6,
              defaultValue: admin.email,
            },
            {
              label: "Password",
              type: "password",
              name: "password",
              col: 6,
            },
            {
              label: "Role",
              type: "select",
              name: "role",
              inputOptions: {
                required: "กรุณาเลือก role",
              },
              col: 6,
              items: roles,
              defaultValue: admin.role.id,
            },
          ]}
          onBack={() => navigate("/admin/list")}
        />
      </>
    );
  }
};

export default withAuth(withPermission(EditAdmin, "MANAGE_ADMIN"));

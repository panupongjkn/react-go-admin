import { useEffect, useState } from "react";

import { AdminServices } from "services";
import FieldList from "components/common/FieldList";
import Header from "components/common/Header";
import { IPermission } from "interfaces/user";
import RoleServices from "services/role";
import useAlert from "hooks/useAlert";
import { useNavigate } from "react-router-dom";
import useToken from "hooks/useToken";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

type TCreateAdmin = {
  email: string;
  password: string;
  role: number;
};

const CreateAdmin = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { onAlert } = useAlert();

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
  };

  const onSubmit = (data: any) => {
    let dataProps: TCreateAdmin = data;
    AdminServices.create(token as string, dataProps)
      .then((res) => {
        onAlert("success", "สร้าง Admin สำเร็จ");
        navigate("/admin/list");
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  return (
    <>
      <Header
        title="Create a new admin"
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
            label: "New admin",
          },
        ]}
      />
      <FieldList
        type="create"
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
          },
          {
            label: "Password",
            type: "password",
            name: "password",
            inputOptions: {
              required: "กรุณากรอกรหัสผ่าน",
            },
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
          },
        ]}
        onBack={() => navigate("/admin/list")}
      />
    </>
  );
};

export default withAuth(withPermission(CreateAdmin, "MANAGE_ADMIN"));

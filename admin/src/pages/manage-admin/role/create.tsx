import { useEffect, useState } from "react";

import FieldList from "components/common/FieldList";
import Header from "components/common/Header";
import { IPermission } from "interfaces/user";
import PermissionServices from "services/permission";
import RoleServices from "services/role";
import useAlert from "hooks/useAlert";
import { useNavigate } from "react-router-dom";
import useToken from "hooks/useToken";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

type TCreateRole = {
  name: string;
  code: string;
  permissions: boolean[];
};

const CreateRole = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { onAlert } = useAlert();

  const [permissions, setPermissions] = useState<
    {
      label: any;
      value: any;
    }[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    PermissionServices.getAll(token as string, {
      page: 1,
      per_page: 100,
    }).then((res) => {
      setPermissions(
        res.data.data.map((permisision: IPermission, index: number) => {
          return {
            label: `${permisision.name} (${permisision.code})`,
            value: permisision.id,
          };
        })
      );
    });
  };

  const onSubmit = (data: any) => {
    let dataProps: TCreateRole = data;
    let permissionsSelected = dataProps.permissions.map(
      (permission: boolean, index: number) => {
        if (permission) {
          return permissions[index].value;
        }
      }
    );
    permissionsSelected = permissionsSelected.filter(
      (permissionSelected) => permissionSelected !== undefined
    );
    RoleServices.create(token as string, {
      ...dataProps,
      permissions: permissionsSelected,
    })
      .then((res) => {
        onAlert("success", "สร้าง Role สำเร็จ");
        navigate("/role/list");
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  return (
    <>
      <Header
        title="Create a new role"
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
            label: "New role",
          },
        ]}
      />
      <FieldList
        type="create"
        onSubmit={onSubmit}
        fields={[
          {
            label: "Name",
            type: "text",
            name: "name",
            inputOptions: {
              required: "กรุณากรอกชื่อตำแหน่ง",
            },
            col: 6,
          },
          {
            label: "Code",
            type: "text",
            name: "code",
            inputOptions: {
              required: "กรุณากรอก Code",
            },
            col: 6,
          },
          {
            label: "Permission",
            type: "check-list",
            name: "permissions",
            inputOptions: {
              atLeastOne: "กรุณาเลือกอย่างน้อย 1 permission",
            },
            col: 12,
            items: permissions,
          },
        ]}
        onBack={() => navigate("/role/list")}
      />
    </>
  );
};

export default withAuth(withPermission(CreateRole, "MANAGE_ADMIN"));

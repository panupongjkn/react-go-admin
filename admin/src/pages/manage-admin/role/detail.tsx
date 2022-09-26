import { IPermission, IRole } from "interfaces/user";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FieldList from "components/common/FieldList";
import Header from "components/common/Header";
import PermissionServices from "services/permission";
import RoleServices from "services/role";
import useAlert from "hooks/useAlert";
import useToken from "hooks/useToken";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

const RoleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();
  const { onAlert } = useAlert();

  const [role, setRole] = useState<IRole | null>(null);
  const [permissions, setPermissions] = useState<
    {
      label: any;
      value: any;
      checked: boolean;
    }[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let permissionsData: {
      label: any;
      value: any;
      checked: boolean;
    }[] = [];
    PermissionServices.getAll(token as string, {
      page: 1,
      per_page: 100,
    })
      .then((res) => {
        permissionsData = res.data.data.map(
          (permisision: IPermission, index: number) => {
            return {
              label: `${permisision.name} (${permisision.code})`,
              value: permisision.id,
            };
          }
        );
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
    RoleServices.getDetail(token as string, id as string)
      .then((res) => {
        setRole(res.data.data);
        setPermissions(
          permissionsData.map((permission, index) => {
            let isChecked = false;
            res.data.data.permissions.forEach(
              (user_permission: IPermission) => {
                if (user_permission.id === permission.value) {
                  isChecked = true;
                }
              }
            );
            return { ...permission, checked: isChecked };
          })
        );
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  if (role && permissions) {
    return (
      <>
        <Header
          title="Role Details"
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
              label: role.name,
            },
          ]}
        />
        <FieldList
          type="detail"
          fields={[
            {
              label: "Name",
              type: "text",
              name: "name",
              defaultValue: role?.name,
              col: 6,
            },
            {
              label: "Code",
              type: "text",
              name: "code",
              defaultValue: role?.code,
              col: 6,
            },
            {
              label: "Permission",
              type: "check-list",
              name: "permissions",
              col: 12,
              items: permissions,
            },
          ]}
          onBack={() => navigate("/role/list")}
        />
      </>
    );
  } else {
    return <></>;
  }
};

export default withAuth(withPermission(RoleDetail, "MANAGE_ADMIN"));

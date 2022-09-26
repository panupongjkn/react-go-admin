import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AdminServices } from "services";
import FieldList from "components/common/FieldList";
import Header from "components/common/Header";
import { IUser } from "interfaces/user";
import useAlert from "hooks/useAlert";
import useToken from "hooks/useToken";
import withAuth from "hocs/withAuth";
import withPermission from "hocs/withPermission";

const AdminDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useToken();
  const { onAlert } = useAlert();

  const [admin, setAdmin] = useState<IUser | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    AdminServices.getDetail(token as string, id as string)
      .then((res) => {
        setAdmin(res.data.data);
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  if (admin) {
    return (
      <>
        <Header
          title="Admin Details"
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
              label: admin.email,
            },
          ]}
        />
        <FieldList
          type="detail"
          fields={[
            {
              label: "Email",
              type: "email",
              name: "email",
              defaultValue: admin?.email,
              col: 6,
            },
            {
              label: "Role",
              type: "text",
              name: "role",
              defaultValue: admin?.role.name,
              col: 6,
            },
          ]}
          onBack={() => navigate("/admin/list")}
        />
      </>
    );
  } else {
    return <></>;
  }
};

export default withAuth(withPermission(AdminDetail, "MANAGE_ADMIN"));

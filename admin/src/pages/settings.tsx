import { AdminServices } from "services";
import FieldList from "components/common/FieldList";
import Header from "components/common/Header";
import useAlert from "hooks/useAlert";
import { useNavigate } from "react-router-dom";
import useToken from "hooks/useToken";
import useUser from "hooks/useUser";
import withAuth from "hocs/withAuth";

interface IChangePasswordData {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

const Settings = () => {
  const navigate = useNavigate();
  const { token, clearToken } = useToken();
  const { onAlert } = useAlert();
  const { user } = useUser();

  const onSubmit = (data: any) => {
    let dataProps: IChangePasswordData = data;
    AdminServices.changePassword(token as string, dataProps)
      .then((res) => {
        onAlert("success", "เปลี่ยนรหัสผ่านสำเร็จ");
        clearToken();
        navigate("/login");
      })
      .catch((err) => {
        onAlert("error", err.response.data.message);
      });
  };

  return (
    <>
      <Header
        title="User Settings"
        breadcrumbs={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Settings",
          },
          {
            label: user?.email as string,
          },
        ]}
      />
      <FieldList
        type="edit"
        onSubmit={onSubmit}
        fields={[
          {
            label: "Old Password",
            type: "password",
            name: "old_password",
            inputOptions: {
              required: "กรุณากรอกรหัสผ่านเก่า",
            },
            col: 6,
          },
          {
            label: "",
            type: "box",
            name: "",
            col: 6,
          },
          {
            label: "New Password",
            type: "password",
            name: "new_password",
            inputOptions: {
              required: "กรุณากรอกรหัสผ่านใหม่",
            },
            col: 6,
          },
          {
            label: "Confirm New Password",
            type: "password",
            name: "confirm_new_password",
            inputOptions: {
              required: "กรุณากรอกยืนยันรหัสผ่านใหม่",
            },
            col: 6,
          },
        ]}
        onBack={() => navigate("/dashboard")}
      />
    </>
  );
};

export default withAuth(Settings);

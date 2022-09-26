import { useEffect, useState } from "react";

import AdminServices from "services/admin";
import { useNavigate } from "react-router-dom";
import useToken from "hooks/useToken";
import useUser from "hooks/useUser";

const withAuth = (WrappedComponent: any) => (props: any) => {
  let navigate = useNavigate();
  const { token, clearToken } = useToken();
  const { user, onSetUser, onClearUser } = useUser();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    if (token) {
      if (!user) {
        await AdminServices.getDetailByToken(token)
          .then((res) => {
            onSetUser(res.data.data);
            setIsReady(true);
          })
          .catch((err) => {
            clearToken();
            onClearUser();
            navigate("/login");
          });
      } else {
        setIsReady(true);
      }
    } else {
      navigate("/login");
    }
  };

  if (!isReady) {
    return <div></div>;
  }
  return <WrappedComponent {...props} />;
};

export default withAuth;

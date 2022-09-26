import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import useToken from "hooks/useToken";

const withNotAuth = (WrappedComponent: any) => (props: any) => {
  let navigate = useNavigate();
  const { token } = useToken();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return <div></div>;
  }
  return <WrappedComponent {...props} />;
};

export default withNotAuth;

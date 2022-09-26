import { useEffect, useState } from "react";

import { TPermission } from "interfaces/user";
import usePermission from "hooks/usePermission";
import useUser from "hooks/useUser";

const withPermission =
  (WrappedComponent: any, permission: TPermission) => (props: any) => {
    const { checkPermission } = usePermission();
    const [isReady, setIsReady] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
      let hasPermission = checkPermission(permission);
      if (hasPermission) {
        setHasPermission(true);
      }
      setIsReady(true);
    }, []);

    if (!isReady) {
      return <div></div>;
    }
    if (!hasPermission) {
      return <div>Not has permission</div>;
    }
    return <WrappedComponent {...props} />;
  };

export default withPermission;

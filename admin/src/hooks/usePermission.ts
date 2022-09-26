import { TPermission } from "interfaces/user";
import useUser from "hooks/useUser";

const usePermission = () => {
  const { user } = useUser();

  const checkPermission = (permission: TPermission) => {
    let hasPermission = false;
    if (permission) {
      user?.role.permissions.forEach((userPermission) => {
        if (permission === userPermission.code) {
          hasPermission = true;
        }
      });
      return hasPermission;
    } else {
      return true;
    }
  };

  return {
    checkPermission,
  };
};

export default usePermission;

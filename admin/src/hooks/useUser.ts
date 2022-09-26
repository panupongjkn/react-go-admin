import { UserContext } from "contexts/UserContext";
import { useContext } from "react";

const useUser = () => {
  const userContext = useContext(UserContext);

  return userContext;
};

export default useUser;

import { ReactNode, createContext, useState } from "react";

import { IUser } from "interfaces/user";

interface IUserContext {
  user: IUser | null;
  onSetUser: (data: IUser) => void;
  onClearUser: () => void;
}

const userContextDefault: IUserContext = {
  user: null,
  onSetUser: () => {},
  onClearUser: () => {},
};

export const UserContext = createContext<IUserContext>(userContextDefault);

const UserContextStore = (): IUserContext => {
  const [user, setUser] = useState<IUser | null>(null);

  const onSetUser = (data: IUser) => {
    setUser(data);
  };

  const onClearUser = () => {
    setUser(null);
  };

  return {
    user,
    onSetUser,
    onClearUser,
  };
};

interface Props {
  children?: ReactNode;
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <UserContext.Provider value={UserContextStore()}>
      {children}
    </UserContext.Provider>
  );
};

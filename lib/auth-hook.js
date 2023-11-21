import { createContext, useContext } from "react";

export const AuthContext = createContext({});

export const useAuth = () => {
  const data = useContext(AuthContext);

  return data;
};

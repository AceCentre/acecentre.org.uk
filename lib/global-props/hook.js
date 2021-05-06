import { useContext } from "react";
import { GlobalsContext } from "./context";

export const useGlobalProps = () => {
  const data = useContext(GlobalsContext);

  return data;
};

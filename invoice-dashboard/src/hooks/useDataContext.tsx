import { DataContext } from "../contexts/DataContext";
import { useContext } from "react";

export const useDataContext = () => {
  const contextValues = useContext(DataContext);

  if (!contextValues) {
    throw new Error("useDataContext is used outside its context");
  }

  return contextValues;
};

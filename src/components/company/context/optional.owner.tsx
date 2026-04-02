import { useContext } from "react";
import { OptionalCompanyContext } from "./CompanyContext";

export const useOptionalCompanyOwner = () => {
  const context = useContext(OptionalCompanyContext);
  if (!context) {
    throw new Error("No OptionalCompanyOwner provider");
  }
  return context;
};

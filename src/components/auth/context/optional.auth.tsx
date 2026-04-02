import { useContext } from "react";
import { OptionalAuthContext } from "./OptionalAuthContext";

export const useOptionalAuth = () => {
  const context = useContext(OptionalAuthContext);
  if (!context) {
    throw new Error("Provide OptionalAuth provider");
  }
  return context;
};

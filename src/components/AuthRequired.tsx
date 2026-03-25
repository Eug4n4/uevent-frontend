import type { IRootState } from "@/state/store";
import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AuthRequired: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state: IRootState) => state.auth);

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to={"/auth"} replace />;

}

export default AuthRequired;
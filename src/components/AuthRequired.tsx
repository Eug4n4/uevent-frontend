import { api } from "@/lib/api";
import { logout, setLoading } from "@/state/auth/auth.slice";
import type { IRootState } from "@/state/store";
import Cookies from "js-cookie";
import { useEffect, type PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRequired: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: IRootState) => state.auth);

  const token = Cookies.get("access");

  useEffect(() => {
    if (isAuthenticated && !token) {
      dispatch(setLoading(true));

      api
        .post("accounts/refresh")
        .catch(() => dispatch(logout()))
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [isAuthenticated, token, dispatch]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!token) {
    return null;
  }

  return children;
};

export default AuthRequired;

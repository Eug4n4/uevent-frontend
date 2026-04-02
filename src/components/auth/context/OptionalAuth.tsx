import { logout } from "@/state/auth/auth.slice";
import type { IRootState } from "@/state/store";
import Cookies from "js-cookie";
import React, { useEffect, useState, type PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OptionalAuthContext } from "./OptionalAuthContext";

export const OptionalAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: IRootState) => state.auth);
  const [authenticated] = useState(isAuthenticated);

  const token = Cookies.get("access");

  useEffect(() => {
    if (isAuthenticated && !token) {
      dispatch(logout());
    }
  }, [isAuthenticated, token, dispatch]);
  if (isLoading) {
    return null;
  }
  return <OptionalAuthContext value={{ authenticated }}>{children}</OptionalAuthContext>;
};

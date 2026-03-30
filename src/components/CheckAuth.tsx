import { ProfileService } from "@/lib/services/ProfileService";
import { loginSuccess } from "@/state/auth/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type CheckAuthProps = {
  children: React.ReactNode;
};

const CheckAuth = ({ children }: CheckAuthProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await ProfileService.getProfileWithAccount();
        dispatch(loginSuccess(response));
        return;
      } catch (error) {
        if (error instanceof Error) {
          console.log(`CheckAuth: ${error.name}: ${error.message}`);
        } else {
          console.log("CheckAuth: unexpected error", error);
        }
      }
    };
    getMe();
  }, [dispatch]);
  return children;
};

export default CheckAuth;

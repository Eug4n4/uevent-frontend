import { ProfileService } from "@/lib/services/ProfileService";
import { loginSuccess, setLoading } from "@/state/auth/auth.slice";
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
      } catch (e) {
        console.log(`CheckAuth: ${e?.name}: ${e?.message}`);
        dispatch(setLoading(false));
      }
    };
    getMe();
  }, []);
  return children;
};

export default CheckAuth;

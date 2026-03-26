import type { IRootState } from "@/state/store";
import { useSelector } from "react-redux";

const UserAvatar: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ ...rest }) => {
  const { user } = useSelector((state: IRootState) => state.auth)

  return (
    <div className="avatar-section">
      <img
        className="avatar-circle"
        src={user?.avatar_url || "/favicon.svg"}
        alt="avatar"
        {...rest}
      />
    </div>
    
  );
}


export default UserAvatar;
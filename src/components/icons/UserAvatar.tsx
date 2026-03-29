import type { IRootState } from "@/state/store";
import { useSelector } from "react-redux";

type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  ref?: React.Ref<HTMLImageElement>;
};

const UserAvatar: React.FC<AvatarProps> = ({ ref = undefined, ...rest }) => {
  const { user } = useSelector((state: IRootState) => state.auth);

  return (
    <div className="avatar-section">
      <img className="avatar-circle" src={user?.avatar_url || "/favicon.svg"} alt="avatar" {...rest} ref={ref} />
    </div>
  );
};

export default UserAvatar;

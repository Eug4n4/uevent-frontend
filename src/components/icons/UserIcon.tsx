import type { IRootState } from "@/state/store";
import { useSelector } from "react-redux";

const UserIcon = () => {
  const { user } = useSelector((state: IRootState) => state.auth)

  return (
    <div>
      <div className="user-section">
        <div className="user-avatar">
          <img
            src={"/favicon.svg"}
            alt="avatar"
          />
        </div>
        <div>
          <p>{user?.username}</p>
          <p>{user?.role}</p>
        </div>
      </div>
    </div>
  );
}


export default UserIcon;
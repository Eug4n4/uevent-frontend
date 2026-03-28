import { AuthService } from "@/lib/services/AuthService";
import { logout } from "@/state/auth/auth.slice";
import type { IRootState } from "@/state/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileSettings = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [avatar, setAvatar] = useState("https://placehold.co/160x160?text=nICE");
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AuthService.logout();
    dispatch(logout());
  };

  return (
    <>
      <h3>Settings</h3>
      <div className="avatar-block">
        <img src={user?.avatar_url || "/favicon.svg"} alt="profile avatar" />
        <button type="button" className="pill-btn" onClick={() => setAvatar("https://placehold.co/160x160?text=COOL")}>
          Upload placeholder
        </button>
      </div>
      <label>
        <span>Username</span>
        <input type="text" placeholder="nICE explorer" />
      </label>
      <label>
        <span>Bio</span>
        <textarea rows={3} placeholder="Describe yourself for attendees." />
      </label>
      <button type="button" className="pill-btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default ProfileSettings;

import { AuthService } from "@/lib/services/AuthService";
import type { EditableProfileAttributes } from "@/lib/services/types/profile.types";
import { logout, updateUser } from "@/state/auth/auth.slice";
import type { IRootState } from "@/state/store";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "../icons/UserAvatar";

import "@/assets/css/profile/profile.settings.css";
import { ProfileService } from "@/lib/services/ProfileService";
import { toDateString } from "@/utils/format.date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import z from "zod";

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username is too short" })
    .max(30, { error: "Username is too long" })
    .regex(/^[a-zA-Z0-9\-._!\p{L}]+$/u, { error: "Can only contain letters, numbers, and -._!" }),
});

const ProfileSettings = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [off, setOff] = useState(true);
  const fileInput = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditableProfileAttributes>({
    defaultValues: { username: user?.username },
    resolver: zodResolver(usernameSchema),
    mode: "all",
  });
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AuthService.logout();
    dispatch(logout());
  };

  const onSubmit = async (data: EditableProfileAttributes) => {
    try {
      let updatedUser = { ...user! };

      if (user?.avatar_url !== avatarRef.current?.src) {
        let avatar: Blob;

        if (fileInput.current?.files?.length) {
          avatar = fileInput.current.files[0];
        } else {
          avatar = await fetch("/favicon.svg").then((res) => res.blob());
        }

        const res = await ProfileService.updateMyAvatar(avatar);

        updatedUser = {
          ...updatedUser,
          ...res.data.data.attributes,
        };
      }

      const res = await ProfileService.update(data.username, user!.id);

      updatedUser = {
        ...updatedUser,
        ...res.data.data.attributes,
      };

      dispatch(updateUser(updatedUser));
      setOff(true);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) {
      return;
    }
    avatarRef.current!.src = URL.createObjectURL(file);
  };

  const handleCancelClick = () => {
    reset();
    setOff(true);
    fileInput.current!.value = "";
    avatarRef.current!.src = user?.avatar_url || "/favicon.svg";
  };

  return (
    <>
      <h3>Settings</h3>
      <form className="profile-settings-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="avatar-preview">
          <UserAvatar ref={avatarRef} />
          <input
            onChange={handleAvatarChange}
            ref={fileInput}
            disabled={off}
            type="file"
            name="avatar"
            id="user-avatar"
            accept="image/*"
          />
          <button type="button" className="camera-button" disabled={off} onClick={() => fileInput.current?.click()}>
            <Camera width={32} height={32} />
          </button>
        </div>
        <div className="profile-settings">
          <label className="field">
            <span>Username:</span>
            <input {...register("username")} disabled={off} defaultValue={user?.username} />
            {errors.username && <small>{errors.username.message}</small>}
          </label>

          <label className="field">
            <span>Email:</span>
            <input type="text" defaultValue={user?.email} disabled />
          </label>
          <label className="field">
            <span>Role: {user?.role}</span>
          </label>
          <label className="field">
            <span>Member since: {toDateString(user?.created_at!)}</span>
          </label>
          <div className="profile-settings-controls">
            <div>
              {off ? (
                <button
                  type="button"
                  className="pill-btn edit-settings"
                  onClick={(e) => {
                    e.preventDefault();
                    setOff(!off);
                  }}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button type="submit" className="pill-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Save"}
                  </button>
                  <button type="button" className="pill-btn" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </>
              )}
            </div>
            <button type="button" className="pill-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileSettings;

import ProfileTopMenu from "@/components/profile/ProfileTopMenu";
import { Outlet } from "react-router-dom";

export function UserProfilePage() {
  return (
    <main className="profile-layout">
      <ProfileTopMenu />
      <section className="profile-card">
        <Outlet />
      </section>
    </main>
  );
}

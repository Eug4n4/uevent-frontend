import "@/assets/css/topmenu.css";
import type { IRootState } from "@/state/store";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

type TopMenuLink = {
  name: string;
  to: string;
};

const TOP_MENU_LINKS: TopMenuLink[] = [
  {
    name: "Settings",
    to: "settings",
  },
  {
    name: "Notifications",
    to: "notifications",
  },
  {
    name: "Subscriptions",
    to: "subscriptions",
  },
  {
    name: "Tickets",
    to: "tickets",
  },
  {
    name: "Events",
    to: "events",
  },
  {
    name: "Companies",
    to: "companies",
  },
  {
    name: "Admin panel",
    to: "admin",
  },
];

const ProfileTopMenu = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <aside className="profile-top-menu">
      {TOP_MENU_LINKS.map((link) => {
        if (user?.role !== "admin" && link.name === "Admin panel") {
          return;
        }
        return (
          <NavLink className={"nav-link"} to={link.to}>
            {link.name}
          </NavLink>
        );
      })}
    </aside>
  );
};

export default ProfileTopMenu;

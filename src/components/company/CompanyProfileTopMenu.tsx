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
    name: "Contact info",
    to: "contacts",
  },
  {
    name: "News",
    to: "news",
  },
];

export const CompanyProfileTopMenu = () => {
  return (
    <aside className="profile-top-menu">
      {TOP_MENU_LINKS.map((link) => {
        return (
          <NavLink key={link.name} className={"nav-link"} to={link.to}>
            {link.name}
          </NavLink>
        );
      })}
    </aside>
  );
};

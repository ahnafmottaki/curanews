import { NavLink } from "react-router";

const SidebarLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md transition text-body hover:bg-muted hover:text-heading ${
          isActive ? "bg-muted text-heading font-semibold" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarLink;

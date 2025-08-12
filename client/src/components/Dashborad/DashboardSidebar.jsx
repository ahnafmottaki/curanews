import { NavLink } from "react-router";
import { FiHome, FiEdit, FiUser, FiLogOut } from "react-icons/fi";
import DashboardLinks from "./DashboardLinks";

const DashboardSidebar = () => {
  return (
    <aside className=" min-h-[calc(100dvh-80px)]  hidden xl:block">
      <DashboardLinks hideLogo />
    </aside>
  );
};

export default DashboardSidebar;

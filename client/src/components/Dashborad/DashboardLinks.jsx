import { FiEdit, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import { NavLink } from "react-router";
import Logo from "../shared/Logo";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { FiPlusCircle } from "react-icons/fi";

const DashboardLinks = ({ hideLogo }) => {
  const { signOutUser } = useAuth();
  const handleLogout = () => {
    const toastId = toast.loading("Signing out...");
    signOutUser()
      .then(() => showUpdateToast(toastId, "success", "Sign out successful!"))
      .catch(() => showUpdateToast(toastId, "error", "Sign out failed!"));
  };
  return (
    <>
      <div className=" bg-surface border-r border-border h-full p-6 flex flex-col justify-between">
        <div>
          {!hideLogo && (
            <div className="mb-5">
              <Logo />
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-2 font-inter">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-body hover:bg-muted"
                }`
              }
            >
              <FiHome /> Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/all-articles"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-body hover:bg-muted"
                }`
              }
            >
              <FiEdit /> Manage Articles
            </NavLink>

            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-body hover:bg-muted"
                }`
              }
            >
              <FiUser /> Manage Users
            </NavLink>

            <NavLink
              to="/dashboard/add-publisher"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-body hover:bg-muted"
                }`
              }
            >
              <FiPlusCircle /> Add Publisher
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center  gap-3 px-4 py-2 rounded-lg text-body hover:bg-muted transition-colors w-full"
            >
              <FiLogOut /> Logout
            </button>
          </nav>
        </div>

        {/* Bottom Section (Optional) */}
        <div className="space-y-3">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-sm text-body hover:text-primary transition-colors"
          >
            <FiHome className="text-base" />
            Back to Home
          </NavLink>

          <p className="text-xs text-muted-foreground font-inter">
            &copy; {new Date().getFullYear()} Cura News. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default DashboardLinks;

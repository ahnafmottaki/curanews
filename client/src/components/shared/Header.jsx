import { useNavigate } from "react-router";
import CustomLink from "../Header/CustomLink";
import { MdOutlineMenu } from "react-icons/md";
import SidebarLink from "../Header/SiderbarLink";
import Logo from "./Logo";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { toast } from "react-toastify";
import showUpdateToast from "../../utils/reactToastify";

const Header = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const toastId = toast.loading("Signing out...");
    signOutUser()
      .then(() => showUpdateToast(toastId, "success", "Sign out successful!"))
      .catch(() => showUpdateToast(toastId, "error", "Sign out failed!"));
  };
  return (
    <header className=" py-3 sm:py-4 px-2 sm:px-4  bg-background backdrop-blur-3xl sticky z-[99] top-0 left-0">
      <div className="container flex items-center justify-between">
        {/* left side */}
        <div className="flex items-center gap-2 xl:gap-1">
          {/* Sidebar for mobile devices */}
          <div className="drawer w-auto xl:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className=" drawer-button">
                <MdOutlineMenu className="text-3xl sm:text-4xl" />
              </label>
            </div>
            <div className="drawer-side ">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              />
              <div className=" bg-surface  min-h-full max-[400px]:w-65 w-80 px-4 py-6 flex flex-col gap-2">
                {/* Sidebar content here */}
                <div className="mb-4">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-2">
                  <SidebarLink to="/">Home</SidebarLink>
                  <SidebarLink to="/all-articles">All Articles</SidebarLink>
                  {user && (
                    <>
                      <SidebarLink to="/add-article">Add Article</SidebarLink>
                      <SidebarLink to="/subscription">Subscription</SidebarLink>
                      <SidebarLink to="/my-articles">My Articles</SidebarLink>
                      {user.isAdmin && (
                        <SidebarLink to="/dashboard">Dashboard</SidebarLink>
                      )}
                      <SidebarLink to="/my-profile">My Profile</SidebarLink>
                      <SidebarLink to="/premium-articles">
                        Premium Articles
                      </SidebarLink>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
          {/* Sidebar end */}
          {/* logo image */}

          <Logo hideInXlDevices />
        </div>
        {/* left side end */}

        {/* navbar links */}
        <nav className="hidden  xl:block">
          <ul className="items-center gap-5 flex">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/all-articles">All Articles</CustomLink>
            {user && (
              <>
                <CustomLink to="/add-article">Add Article</CustomLink>
                <CustomLink to="/subscription">Subscription</CustomLink>
                {user.isAdmin && (
                  <CustomLink to="/dashboard">Dashboard</CustomLink>
                )}
                <CustomLink to="/my-articles">My Articles</CustomLink>
                <CustomLink to="/my-profile">My Profile</CustomLink>
                <CustomLink to="/premium-articles">Premium Articles</CustomLink>
              </>
            )}
          </ul>
        </nav>
        {/* right side with login/logout and  profile if logged in */}
        <div className="flex items-center gap-x-3">
          {/* if user logged in then the this will show the user profile image */}
          {user && (
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  title={user.displayName}
                />
              </div>
            </div>
          )}

          {/* login and logout button */}
          <button
            className="primary-btn"
            onClick={user ? handleLogout : () => navigate("/login")}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

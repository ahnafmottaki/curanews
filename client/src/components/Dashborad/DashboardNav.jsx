import { MdOutlineMenu } from "react-icons/md";
import { useAuth } from "../../contexts/Auth/AuthContext";
import Logo from "../shared/Logo";

import DashboardLinks from "./DashboardLinks";

const DashboardNav = () => {
  // context hooks
  const { user, signOutUser } = useAuth();
  // event handlers

  return (
    <header className=" bg-surface py-3 sm:py-4 px-2 sm:px-4  sticky z-[99] top-0 left-0">
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
              <DashboardLinks />
            </div>
          </div>
          {/* Sidebar end */}
          {/* logo image */}

          <Logo hideInXlDevices />
        </div>
        {/* left side end */}

        {/* right side with login/logout and  profile if logged in */}
        <div className="flex items-center gap-x-3">
          {/* if user logged in then the this will show the user profile image */}

          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                src={user.photoURL}
                alt={user.displayName}
                title={user.displayName}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;

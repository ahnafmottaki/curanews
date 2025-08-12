import { Outlet } from "react-router";
import DashboardNav from "../components/Dashborad/DashboardNav";
import DashboardSidebar from "../components/Dashborad/DashboardSidebar";
import ToastifyContainer from "../components/ToastifyContainer";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNav />
      <main className="container grid xl:grid-cols-[256px_1fr]  ">
        <DashboardSidebar />
        <div className=" overflow-auto hide-scrollbar h-[calc(100dvh-80px)]">
          <Outlet />
        </div>
      </main>
      <ToastifyContainer />
    </>
  );
};

export default DashboardLayout;

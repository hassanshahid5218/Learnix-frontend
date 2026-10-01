

import React from "react";

import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/sidebar/DashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f7f8fc] dark:bg-[#0b1220]">
      <AdminProtected>
        <Heading
          title="Learnix - Admin"
          description="Learnix is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />

        <div className="flex min-h-screen w-full">
          {/* Admin Sidebar */}
          <aside className="w-[68px] shrink-0 sm:w-[80px] lg:w-[240px] xl:w-[270px] 1500px:w-[16%]">
            <div className="sticky top-0 h-screen">
              <AdminSidebar />
            </div>
          </aside>

          {/* Dashboard */}
          <main className="min-w-0 flex-1 overflow-x-hidden">
            <DashboardHero isDashboard={true} />
          </main>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;


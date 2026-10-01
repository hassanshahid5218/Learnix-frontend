

import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/sidebar/DashboardHero";
import AllUsers from "@/app/components/Admin/Users/Allusers";
import Heading from "@/app/utils/Heading";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen bg-[#f7f8fc] dark:bg-[#0b1220]">
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

        {/* Main Content */}
        <main className="min-w-0 flex-1 overflow-hidden">
          <DashboardHero />

          <div className="w-full">
            <AllUsers isTeam={true} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;


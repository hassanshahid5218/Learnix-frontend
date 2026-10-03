

import React, { FC, useEffect, useState } from "react";

import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import CourseCard from "../Course/CourseCard";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [active, setActive] = useState(1);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find(
            (course: any) => course._id === userCourse._id
          )
        )
        .filter((course: any) => course !== undefined);

      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  return (
    <div className="mx-auto flex w-[94%] max-w-[1600px] flex-col gap-5 py-6 sm:w-[92%] sm:py-8 lg:flex-row lg:items-start lg:gap-8">
      {/* Profile Sidebar */}
      <div
        className={`w-full shrink-0 rounded-xl border border-black/10 bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/90 lg:w-[280px] xl:w-[310px] ${
          scroll
            ? "lg:sticky lg:top-[100px]"
            : "lg:sticky lg:top-[30px]"
        }`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {active === 1 && (
          <div className="w-full">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )}

        {active === 2 && (
          <div className="w-full">
            <ChangePassword />
          </div>
        )}

        {active === 3 && (
          <div className="w-full">
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
                Enrolled Courses
              </h1>
              <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                Courses you have purchased and can access.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {courses &&
                courses?.map((item: any, index: number) => (
                  <CourseCard
                    item={item}
                    key={index}
                    isProfile={true}
                  />
                ))}
            </div>

            {courses?.length === 0 && (
              <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-black/15 bg-black/[0.02] px-5 text-center dark:border-white/15 dark:bg-white/[0.02]">
                <h1 className="font-Poppins text-base text-black/60 dark:text-white/60 sm:text-lg">
                  You dont have any purchased courses!
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;



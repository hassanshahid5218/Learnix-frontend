
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.jpg";
import Image from "next/image";

import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  const itemClass = (itemActive: boolean) =>
    `flex shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 lg:w-full ${
      itemActive
        ? "bg-slate-100 text-black shadow-sm dark:bg-slate-800 dark:text-white"
        : "text-black/65 hover:bg-black/[0.04] dark:text-white/70 dark:hover:bg-white/[0.05]"
    }`;

  return (
    <div className="w-full">
      {/* Profile identity */}
      <div className="hidden border-b border-black/10 px-5 py-5 dark:border-white/10 lg:block">
        <div className="flex items-center gap-3">
          <Image
            src={
              user.avatar || avatar
                ? user.avatar?.url || avatar
                : avatarDefault
            }
            alt=""
            width={45}
            height={45}
            className="h-[45px] w-[45px] rounded-full object-cover"
          />

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-black dark:text-white">
              {user?.name}
            </h3>

            <p className="truncate text-xs text-black/45 dark:text-white/45">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-1 overflow-x-auto p-2 scrollbar-hide lg:flex-col lg:gap-1 lg:overflow-visible lg:p-3">
        <button
          type="button"
          className={itemClass(active === 1)}
          onClick={() => setActive(1)}
        >
          <Image
            src={
              user.avatar || avatar
                ? user.avatar?.url || avatar
                : avatarDefault
            }
            alt=""
            width={30}
            height={30}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />

          <h5 className="whitespace-nowrap font-Poppins text-sm lg:text-base">
            My Account
          </h5>
        </button>

        <button
          type="button"
          className={itemClass(active === 2)}
          onClick={() => setActive(2)}
        >
          <RiLockPasswordLine size={21} className="shrink-0" />

          <h5 className="whitespace-nowrap font-Poppins text-sm lg:text-base">
            Change Password
          </h5>
        </button>

        <button
          type="button"
          className={itemClass(active === 3)}
          onClick={() => setActive(3)}
        >
          <SiCoursera size={20} className="shrink-0" />

          <h5 className="whitespace-nowrap font-Poppins text-sm lg:text-base">
            Enrolled Courses
          </h5>
        </button>

        {user.role === "admin" && (
          <Link
            className={itemClass(active === 6)}
            href="/admin"
          >
            <MdOutlineAdminPanelSettings
              size={21}
              className="shrink-0"
            />

            <h5 className="whitespace-nowrap font-Poppins text-sm lg:text-base">
              Admin Dashboard
            </h5>
          </Link>
        )}

        <button
          type="button"
          className={itemClass(active === 4)}
          onClick={() => logoutHandler()}
        >
          <AiOutlineLogout size={21} className="shrink-0" />

          <h5 className="whitespace-nowrap font-Poppins text-sm lg:text-base">
            Logout
          </h5>
        </button>
      </div>
    </div>
  );
};

export default SideBarProfile;



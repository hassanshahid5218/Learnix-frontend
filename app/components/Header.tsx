

"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";

import {
  HiOutlineMenuAlt3,
  HiOutlineUserCircle,
  HiOutlineX,
} from "react-icons/hi";

import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/ٍSignUp";
import Verification from "./Auth/Verification";

import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.jpg";

import { useSession } from "next-auth/react";

import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";

import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({
  activeItem,
  setOpen,
  route,
  open,
  setRoute,
}) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user } = useSelector((state: any) => state.auth);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  const [logout, setLogout] = useState(false);

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });

          refetch();
        }
      }

      if (data === null) {
        if (isSuccess) {
          toast.success("Login successfully");
        }
      }

      if (data === null && !isLoading && !userData) {
        setLogout(true);
      }
    }
  }, [data, userData, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* ================= HEADER ================= */}
      <div
        className={`${
          active
            ? "fixed left-0 top-0 z-[80] h-[72px] w-full border-b border-gray-200/70 bg-white/90 shadow-lg backdrop-blur-xl transition-all duration-500 dark:border-white/[0.08] dark:bg-[#0b1020]/90"
            : "relative z-[80] h-[80px] w-full border-b border-gray-200/70 bg-white/80 transition-all duration-500 dark:border-white/[0.08] dark:bg-[#0b1020]/80"
        }`}
      >
        {/* Header container */}
        <div className="mx-auto h-full w-[94%] max-w-[1500px] 800px:w-[92%]">
          <div className="flex h-full w-full items-center justify-between gap-4 px-1 sm:px-2">
            {/* ================= LOGO ================= */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2"
            >
              {/* Logo mark */}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#37a39a] to-[#2d7f78] shadow-md shadow-[#37a39a]/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#37a39a]/30">
                <span className="text-[15px] font-bold text-white">E</span>
              </div>

              {/* Logo text */}
              <span className="font-Poppins text-[20px] font-semibold tracking-[-0.3px] text-gray-900 transition-colors duration-300 group-hover:text-[#37a39a] dark:text-white dark:group-hover:text-[#5fd1c6] sm:text-[22px]">
                Learnix
              </span>
            </Link>

            {/* ================= DESKTOP NAVIGATION ================= */}
            <div className="hidden items-center gap-4 800px:flex">
              <NavItems activeItem={activeItem} isMobile={false} />

              {/* Theme */}
              <div className="ml-1 border-l border-gray-200 pl-4 dark:border-white/[0.08]">
                <ThemeSwitcher />
              </div>

              {/* User */}
              {userData ? (
                <Link
                  href="/profile"
                  className="group ml-1 flex items-center justify-center"
                >
                  <div
                    className={`rounded-full p-[2px] transition-all duration-300 ${
                      activeItem === 5
                        ? "bg-gradient-to-r from-[#37a39a] to-[#5fd1c6] shadow-md shadow-[#37a39a]/20"
                        : "bg-transparent group-hover:bg-[#37a39a]/30"
                    }`}
                  >
                    <Image
                      src={
                        userData.user.avatar
                          ? userData.user.avatar.url
                          : avatar
                      }
                      width={36}
                      height={36}
                      alt="User profile"
                      className="h-[34px] w-[34px] cursor-pointer rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  aria-label="Open login"
                  onClick={() => setOpen(true)}
                  className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition-all duration-300 hover:bg-[#37a39a]/10 hover:text-[#37a39a] dark:text-gray-200 dark:hover:bg-[#37a39a]/10 dark:hover:text-[#5fd1c6]"
                >
                  <HiOutlineUserCircle size={27} />
                </button>
              )}
            </div>

            {/* ================= MOBILE ACTIONS ================= */}
            <div className="flex items-center gap-2 800px:hidden">
              <div className="scale-90 sm:scale-100">
                <ThemeSwitcher />
              </div>

              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpenSidebar(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm transition-all duration-300 hover:border-[#37a39a]/30 hover:bg-[#37a39a]/10 hover:text-[#37a39a] active:scale-95 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:hover:bg-[#37a39a]/10 dark:hover:text-[#5fd1c6]"
              >
                <HiOutlineMenuAlt3 size={24} />
              </button>
            </div>
          </div>

          {/* ================= MOBILE SIDEBAR ================= */}
          {openSidebar && (
            <div
              id="screen"
              onClick={handleClose}
              className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-[2px] 800px:hidden"
            >
              {/* Sidebar */}
              <div
                className="fixed right-0 top-0 flex h-screen w-[82%] max-w-[380px] flex-col overflow-y-auto border-l border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-white/[0.08] dark:bg-[#0d1428]"
              >
                {/* Sidebar header */}
                <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-200 px-5 dark:border-white/[0.08]">
                  <Link
                    href="/"
                    onClick={() => setOpenSidebar(false)}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#37a39a] to-[#2d7f78] shadow-md shadow-[#37a39a]/20">
                      <span className="text-[15px] font-bold text-white">
                        E
                      </span>
                    </div>

                    <span className="font-Poppins text-[19px] font-semibold text-gray-900 dark:text-white">
                      ELearning
                    </span>
                  </Link>

                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpenSidebar(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
                  >
                    <HiOutlineX size={22} />
                  </button>
                </div>

                {/* Sidebar navigation */}
                <div className="flex-1 px-3 py-5">
                  <NavItems activeItem={activeItem} isMobile={true} />

                  {/* Mobile profile */}
                  <div className="mt-6 border-t border-gray-200 pt-5 dark:border-white/[0.08]">
                    {userData ? (
                      <Link
                        href="/profile"
                        onClick={() => setOpenSidebar(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                      >
                        <div
                          className={`rounded-full p-[2px] ${
                            activeItem === 5
                              ? "bg-gradient-to-r from-[#37a39a] to-[#5fd1c6]"
                              : "bg-gray-200 dark:bg-white/[0.1]"
                          }`}
                        >
                          <Image
                            src={
                              userData.user.avatar
                                ? userData.user.avatar.url
                                : avatar
                            }
                            width={42}
                            height={42}
                            alt="User profile"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {userData.user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            View profile
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(true);
                          setOpenSidebar(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-[#37a39a] dark:text-gray-200 dark:hover:bg-white/[0.05] dark:hover:text-[#5fd1c6]"
                      >
                        <HiOutlineUserCircle size={28} />

                        <div>
                          <p className="text-sm font-semibold">
                            Login / Sign Up
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Access your account
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sidebar footer */}
                <div className="shrink-0 border-t border-gray-200 px-5 py-5 dark:border-white/[0.08]">
                  <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Copyright © 2023 ELearning
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= LOGIN MODAL ================= */}
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}

      {/* ================= SIGN UP MODAL ================= */}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}

      {/* ================= VERIFICATION MODAL ================= */}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;


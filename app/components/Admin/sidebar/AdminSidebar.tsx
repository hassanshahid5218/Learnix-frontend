
"use client";

import { FC, useEffect, useState, ReactNode } from "react";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";

import { Box, IconButton, Typography } from "@mui/material";

import "react-pro-sidebar/dist/css/styles.css";

import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";

import avatarDefault from "../../../../public/assets/avatar.jpg";

import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ItemProps {
  title: string;
  to: string;
  icon: ReactNode;
  selected: string;
  setSelected: (title: string) => void;
}

const Item: FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link
        href={to}
        className="flex w-full items-center rounded-lg transition-all duration-200"
      >
        <Typography className="!text-[14px] !font-medium !font-Poppins">
          {title}
        </Typography>
      </Link>
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:
            theme === "dark"
              ? "#111827 !important"
              : "#ffffff !important",
          borderRight:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.06)",
        },

        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },

        "& .pro-inner-item": {
          padding: "10px 18px !important",
          margin: "4px 10px",
          borderRadius: "10px",
          transition: "all 0.2s ease",
          color: theme === "dark" ? "#cbd5e1" : "#475569",
        },

        "& .pro-inner-item:hover": {
          background:
            theme === "dark"
              ? "rgba(99,102,241,0.12)"
              : "rgba(99,102,241,0.07)",
          color: "#6366f1 !important",
        },

        "& .pro-menu-item.active .pro-inner-item": {
          background:
            theme === "dark"
              ? "rgba(99,102,241,0.18)"
              : "rgba(99,102,241,0.10)",
          color: "#6366f1 !important",
        },

        "& .pro-menu-item.active": {
          color: "#6366f1 !important",
        },

        "& .pro-menu-item": {
          color: theme === "dark" ? "#cbd5e1" : "#475569",
        },
      }}
      className="fixed left-0 top-0 z-[1000] hidden h-screen lg:block"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          height: "100vh",
          width: isCollapsed ? "80px" : "260px",
          transition: "width 0.25s ease",
        }}
      >
        <Menu iconShape="square">

          {/* ================= Header ================= */}

          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "12px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: "8px",
                }}
              >
                <Link href="/">
                  <h3 className="text-[24px] font-bold tracking-wide text-slate-900 dark:text-white">
                    Learnix
                  </h3>
                </Link>

                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="!rounded-lg hover:!bg-slate-100 dark:hover:!bg-slate-800"
                >
                  <ArrowBackIosIcon className="!text-[18px] text-slate-700 dark:text-slate-300" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* ================= Profile ================= */}

          {!isCollapsed && (
            <Box
              sx={{
                mb: "28px",
                px: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    padding: "4px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  }}
                >
                  <Image
                    alt="profile-user"
                    width={90}
                    height={90}
                    src={user?.avatar?.url || avatarDefault}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      border: "3px solid white",
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  mt: "12px",
                }}
              >
                <Typography
                  variant="h4"
                  className="!text-[16px] !font-semibold text-slate-800 dark:!text-white"
                >
                  {user?.name}
                </Typography>

                <Typography
                  variant="h6"
                  className="!mt-1 !text-[13px] !font-medium !capitalize text-indigo-500"
                >
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          {/* ================= Menu ================= */}

          <Box
            sx={{
              paddingLeft: isCollapsed ? "0" : "3%",
              paddingRight: isCollapsed ? "0" : "3%",
              paddingBottom: "30px",
            }}
          >

            {/* Dashboard */}

            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Data */}

            <Typography
              variant="h5"
              sx={{
                m: "22px 0 7px 25px",
                opacity: isCollapsed ? 0 : 1,
              }}
              className="!text-[11px] !font-semibold !uppercase !tracking-[1.5px] text-slate-400"
            >
              Data
            </Typography>

            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Content */}

            <Typography
              variant="h5"
              sx={{
                m: "22px 0 7px 25px",
                opacity: isCollapsed ? 0 : 1,
              }}
              className="!text-[11px] !font-semibold !uppercase !tracking-[1.5px] text-slate-400"
            >
              Content
            </Typography>

            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Customization */}

            <Typography
              variant="h5"
              sx={{
                m: "22px 0 7px 25px",
                opacity: isCollapsed ? 0 : 1,
              }}
              className="!text-[11px] !font-semibold !uppercase !tracking-[1.5px] text-slate-400"
            >
              Customization
            </Typography>

            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Controllers */}

            <Typography
              variant="h5"
              sx={{
                m: "22px 0 7px 25px",
                opacity: isCollapsed ? 0 : 1,
              }}
              className="!text-[11px] !font-semibold !uppercase !tracking-[1.5px] text-slate-400"
            >
              Controllers
            </Typography>

            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Analytics */}

            <Typography
              variant="h5"
              sx={{
                m: "22px 0 7px 25px",
                opacity: isCollapsed ? 0 : 1,
              }}
              className="!text-[11px] !font-semibold !uppercase !tracking-[1.5px] text-slate-400"
            >
              Analytics
            </Typography>

            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Order Analytics"
              to="/admin/order-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="User Analytics"
              to="/admin/user-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Extras */}

            <Typography
              variant="h5"
              sx={{
                m: "22px 0 7px 25px",
                opacity: isCollapsed ? 0 : 1,
              }}
              className="!text-[11px] !font-semibold !uppercase !tracking-[1.5px] text-slate-400"
            >
              Extras
            </Typography>

            <Item
              title="Settings"
              to="/profile"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Logout */}

            <div onClick={logoutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;

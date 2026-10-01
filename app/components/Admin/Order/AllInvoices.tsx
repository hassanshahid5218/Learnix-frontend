
"use client";

import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { format } from "timeago.js";

import { useGetAllCoursesQuery } from "@/redux/features/courses/courseApi";
import Loader from "../../Loader";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();

  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any[]>([]);

  // Prepare invoice data
  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );

        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );

        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: course?.price
            ? "$" + course.price
            : "$0",
        };
      });

      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  // ================================
  // DataGrid Columns
  // ================================
  const columns: any = [
    {
      field: "userName",
      headerName: "Name",
      flex: isDashboard ? 0.6 : 0.5,
      minWidth: 180,
    },

    ...(
      isDashboard
        ? []
        : [
            {
              field: "userEmail",
              headerName: "Email",
              flex: 1,
              minWidth: 220,
            },
            {
              field: "title",
              headerName: "Course Title",
              flex: 1,
              minWidth: 220,
            },
          ]
    ),

    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      minWidth: 110,
    },

    ...(
      isDashboard
        ? [
            {
              field: "created_at",
              headerName: "Created At",
              flex: 0.5,
              minWidth: 140,
            },
          ]
        : [
            {
              field: "email_action",
              headerName: "Email",
              flex: 0.2,
              minWidth: 90,
              sortable: false,

              renderCell: (params: any) => {
                return (
                  <a
                    href={`mailto:${params.row.userEmail}`}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <AiOutlineMail
                      className="text-black dark:text-white"
                      size={20}
                    />
                  </a>
                );
              },
            },
          ]
    ),
  ];

  // ================================
  // Create Rows
  // ================================
  const rows: any[] = [];

  orderData.forEach((item: any) => {
    rows.push({
      id: item._id,
      userName: item.userName || "Unknown User",
      userEmail: item.userEmail || "N/A",
      title: item.title || "Unknown Course",
      price: item.price || "$0",
      created_at: format(item.createdAt),
    });
  });

  return (
    <div
      className={`w-full px-3 pb-8 pt-6 sm:px-5 md:px-6 lg:px-8 ${
        isDashboard ? "lg:pt-4" : "lg:pt-8"
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "100%" }}>

          {/* =================================
              PAGE HEADER
          ================================= */}
          {!isDashboard && (
            <div className="mb-5">
              <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white sm:text-2xl">
                All Invoices
              </h1>

              <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                View and manage course purchase invoices.
              </p>
            </div>
          )}

          {/* =================================
              DATA GRID
          ================================= */}
          <Box
            sx={{
              width: "100%",

              height: isDashboard
                ? {
                    xs: "360px",
                    sm: "400px",
                    md: "430px",
                  }
                : {
                    xs: "calc(100vh - 250px)",
                    sm: "calc(100vh - 230px)",
                    md: "calc(100vh - 220px)",
                  },

              minHeight: isDashboard ? "320px" : "500px",

              borderRadius: "18px",

              overflow: "hidden",

              backgroundColor:
                theme === "dark"
                  ? "#111827"
                  : "#ffffff",

              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",

              boxShadow:
                theme === "dark"
                  ? "0 10px 40px rgba(0,0,0,0.18)"
                  : "0 10px 40px rgba(0,0,0,0.05)",

              // =================================
              // MAIN DATAGRID
              // =================================

              "& .MuiDataGrid-root": {
                border: "none !important",
                outline: "none",
                color:
                  theme === "dark"
                    ? "#ffffff"
                    : "#111827",
              },

              // =================================
              // COLUMN HEADER ROW
              // =================================

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor:
                  theme === "dark"
                    ? "#1f2937 !important"
                    : "#f3f4f6 !important",

                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",

                borderBottom:
                  theme === "dark"
                    ? "1px solid rgba(255,255,255,0.08) !important"
                    : "1px solid rgba(0,0,0,0.08) !important",
              },

              // =================================
              // INDIVIDUAL HEADER CELLS
              // =================================

              "& .MuiDataGrid-columnHeader": {
                backgroundColor:
                  theme === "dark"
                    ? "#1f2937 !important"
                    : "#f3f4f6 !important",

                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
              },

              // =================================
              // HEADER TEXT
              // =================================

              "& .MuiDataGrid-columnHeaderTitle": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",

                fontWeight: "600 !important",
              },

              // =================================
              // HEADER ICONS
              // =================================

              "& .MuiDataGrid-sortIcon": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
              },

              "& .MuiDataGrid-menuIcon": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
              },

              // =================================
              // MAIN TABLE
              // =================================

              "& .MuiDataGrid-main": {
                overflow: "auto",
              },

              // =================================
              // ROWS
              // =================================

              "& .MuiDataGrid-row": {
                color:
                  theme === "dark"
                    ? "#ffffff"
                    : "#111827",

                borderBottom:
                  theme === "dark"
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.06)",
              },

              // =================================
              // ROW HOVER
              // =================================

              "& .MuiDataGrid-row:hover": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255,255,255,0.035)"
                    : "rgba(0,0,0,0.025)",
              },

              // =================================
              // CELLS
              // =================================

              "& .MuiDataGrid-cell": {
                borderBottom: "none",

                color:
                  theme === "dark"
                    ? "#f8fafc !important"
                    : "#111827 !important",
              },

              // =================================
              // VIRTUAL SCROLLER
              // =================================

              "& .MuiDataGrid-virtualScroller": {
                backgroundColor:
                  theme === "dark"
                    ? "#111827"
                    : "#ffffff",
              },

              // =================================
              // FOOTER
              // =================================

              "& .MuiDataGrid-footerContainer": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",

                borderTop:
                  theme === "dark"
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",

                backgroundColor:
                  theme === "dark"
                    ? "#1f2937"
                    : "#f3f4f6",
              },

              // =================================
              // PAGINATION
              // =================================

              "& .MuiTablePagination-root": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
              },

              // =================================
              // PAGINATION ICONS
              // =================================

              "& .MuiIconButton-root": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
              },

              // =================================
              // CHECKBOX
              // =================================

              "& .MuiCheckbox-root": {
                color:
                  theme === "dark"
                    ? "#b7ebde"
                    : "#6b7280",
              },

              "& .MuiCheckbox-root.Mui-checked": {
                color:
                  theme === "dark"
                    ? "#57c7a3"
                    : "#3faf82",
              },

              // =================================
              // SCROLLBAR
              // =================================

              "& .MuiDataGrid-scrollbar": {
                scrollbarWidth: "thin",
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
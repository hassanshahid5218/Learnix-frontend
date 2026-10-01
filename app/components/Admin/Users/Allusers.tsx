
"use client";

import React, { FC, useEffect, useState } from "react";

import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";

import { Box, Button, Modal } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { useTheme } from "next-themes";

import { format } from "timeago.js";

import Loader from "../../Loader";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";

import { styles } from "@/app/styles/styles";

import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();

  // =================================
  // MODAL STATES
  // =================================

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  // =================================
  // USER ROLE UPDATE STATES
  // =================================

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  // =================================
  // SELECTED USER FOR DELETE
  // =================================

  const [userId, setUserId] = useState("");

  // =================================
  // DELETE USER MUTATION
  // =================================

  const [
    deleteUser,
    {
      isSuccess: successDelete,
      error: errorDelete,
    },
  ] = useDeleteUserMutation();

  // =================================
  // UPDATE USER ROLE MUTATION
  // =================================

  const [
    updateUserRole,
    {
      error: updateError,
      isSuccess: successUpdate,
    },
  ] = useUpdateUserRoleMutation();

  // =================================
  // GET ALL USERS
  // =================================

  const {
    isLoading,
    data,
    error,
    refetch,
  } = useGetAllUsersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // =================================
  // HANDLE UPDATE / DELETE RESPONSES
  // =================================

  useEffect(() => {
    // Update role error
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    // Update role success
    if (successUpdate) {
      refetch();

      toast.success("User role updated successfully");

      setActive(false);
      setEmail("");
      setRole("admin");
    }

    // Delete success
    if (successDelete) {
      refetch();

      toast.success("User deleted successfully");

      setOpen(false);
      setUserId("");
    }

    // Delete error
    if (errorDelete) {
      if ("data" in errorDelete) {
        const errorMessage = errorDelete as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    updateError,
    successUpdate,
    successDelete,
    errorDelete,
    refetch,
  ]);

  // =================================
  // DATAGRID COLUMNS
  // =================================

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      minWidth: 180,
    },

    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      minWidth: 140,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      minWidth: 220,
    },

    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
      minWidth: 110,
    },

    {
      field: "courses",
      headerName: "Purchased Course",
      flex: 0.5,
      minWidth: 160,
    },

    {
      field: "created_at",
      headerName: "Join At",
      flex: 0.5,
      minWidth: 140,
    },

    // Delete column
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      minWidth: 90,
      sortable: false,

      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setUserId(params.row.id);
            setOpen(true);
          }}
          sx={{
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
          }}
        >
          <AiOutlineDelete
            className="text-black dark:text-white"
            size={20}
          />
        </Button>
      ),
    },

    // Email column
    {
      field: "email_action",
      headerName: "Email",
      flex: 0.2,
      minWidth: 90,
      sortable: false,

      renderCell: (params: any) => (
        <a
          href={`mailto:${params.row.email}`}
          className="flex h-full items-center justify-center"
        >
          <AiOutlineMail
            className="text-black dark:text-white"
            size={20}
          />
        </a>
      ),
    },
  ];

  // =================================
  // CREATE DATAGRID ROWS
  // =================================

  const rows: any[] = [];

  if (isTeam) {
    const newData =
      data &&
      data.users.filter(
        (item: any) => item.role === "admin"
      );

    newData?.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  } else {
    data?.users.forEach((item: any) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    });
  }

  // =================================
  // UPDATE USER ROLE
  // =================================

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter user email");
      return;
    }

    try {
      const result = await updateUserRole({
        email,
        role,
      }).unwrap();

      console.log("Update user role result:", result);
    } catch (error: any) {
      console.log("Update user role error:", error);
    }
  };

  // =================================
  // DELETE USER
  // =================================

  const handleDelete = async () => {
    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    try {
      const result = await deleteUser(userId).unwrap();

      console.log("Delete user result:", result);
    } catch (error: any) {
      console.log("Delete user error:", error);
    }
  };

  // =================================
  // RETURN
  // =================================

  return (
    <div className="w-full px-3 pb-8 pt-6 sm:px-5 md:px-6 lg:px-8 lg:pt-8">

      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "100%" }}>

          {/* =================================
              PAGE HEADER
          ================================= */}

          <div className="mb-5">

            {/* Title + Description */}
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white sm:text-2xl">
                {isTeam ? "Team Members" : "All Users"}
              </h1>

              <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                {isTeam
                  ? "Manage administrators and team members."
                  : "Manage registered users and their account roles."}
              </p>
            </div>

            {/* Add New Member Button */}
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                className={`${styles.button} !h-[46px] !w-full rounded-xl px-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:!w-[200px] dark:border dark:border-[#ffffff6c] dark:bg-[#57c7a3]`}
                onClick={() => setActive(true)}
              >
                Add New Member
              </button>
            </div>

          </div>

          {/* =================================
              USERS TABLE
          ================================= */}

          <Box
            sx={{
              width: "100%",

              height: {
                xs: "calc(100vh - 310px)",
                sm: "calc(100vh - 290px)",
                md: "calc(100vh - 280px)",
              },

              minHeight: "500px",

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
              // DATAGRID MAIN
              // =================================

              "& .MuiDataGrid-main": {
                overflow: "auto",
              },

              // =================================
              // HEADER ROW
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
              // HEADER SORT ICON
              // =================================

              "& .MuiDataGrid-sortIcon": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
              },

              // =================================
              // HEADER MENU ICON
              // =================================

              "& .MuiDataGrid-menuIcon": {
                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
              },

              // =================================
              // CELLS
              // =================================

              "& .MuiDataGrid-cell": {
                borderBottom:
                  theme === "dark"
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.06)",

                color:
                  theme === "dark"
                    ? "#f8fafc !important"
                    : "#111827 !important",
              },

              // =================================
              // ROWS
              // =================================

              "& .MuiDataGrid-row": {
                color:
                  theme === "dark"
                    ? "#ffffff"
                    : "#111827",
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
                borderTop:
                  theme === "dark"
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",

                backgroundColor:
                  theme === "dark"
                    ? "#1f2937"
                    : "#f3f4f6",

                color:
                  theme === "dark"
                    ? "#ffffff !important"
                    : "#111827 !important",
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
              // PAGINATION / OTHER ICONS
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
              checkboxSelection
              rows={rows}
              columns={columns}
            />
          </Box>

          {/* =================================
              UPDATE USER ROLE MODAL
          ================================= */}

          {active && (
            <Modal
              open={active}
              onClose={() => setActive(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-2xl outline-none dark:bg-slate-900 sm:p-7"
              >

                <h1
                  id="modal-modal-title"
                  className="text-center font-Poppins text-xl font-semibold text-black dark:text-white sm:text-[22px]"
                >
                  Add New Member
                </h1>

                <p className="mt-2 text-center text-sm text-black/50 dark:text-white/50">
                  Enter the user's email and select their role.
                </p>

                <div className="mt-5 space-y-4">

                  {/* Email */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className={`${styles.input} w-full`}
                  />

                  {/* Role */}
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`${styles.input} w-full`}
                  >
                    <option value="admin">
                      Admin
                    </option>

                    <option value="user">
                      User
                    </option>
                  </select>

                  {/* Submit */}
                  <button
                    type="button"
                    className={`${styles.button} my-2 !h-[42px] w-full rounded-xl`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>

                </div>
              </Box>
            </Modal>
          )}

          {/* =================================
              DELETE CONFIRMATION MODAL
          ================================= */}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="delete-modal-title"
              aria-describedby="delete-modal-description"
            >
              <Box
                className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-2xl outline-none dark:bg-slate-900 sm:p-7"
              >

                {/* Delete Icon */}
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <AiOutlineDelete
                    className="text-red-500"
                    size={24}
                  />
                </div>

                {/* Title */}
                <h1
                  id="delete-modal-title"
                  className="text-center font-Poppins text-xl font-semibold text-black dark:text-white sm:text-[22px]"
                >
                  Are you sure you want to delete this user?
                </h1>

                {/* Description */}
                <p
                  id="delete-modal-description"
                  className="mt-2 text-center text-sm text-black/50 dark:text-white/50"
                >
                  This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">

                  {/* Cancel */}
                  <button
                    type="button"
                    className={`${styles.button} !h-[42px] !w-full rounded-xl bg-[#57c7a3] sm:!w-[120px]`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    className={`${styles.button} !h-[42px] !w-full rounded-xl bg-[#d63f3f] sm:!w-[120px]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>

                </div>

              </Box>
            </Modal>
          )}

        </Box>
      )}
    </div>
  );
};

export default AllUsers;
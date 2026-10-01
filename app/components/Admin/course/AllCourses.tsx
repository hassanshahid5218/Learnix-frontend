
"use client";

import React, { useEffect, useState, FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/courseApi";
import Loader from "../../Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses: FC<Props> = (props) => {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const { isLoading, data, error, refetch } = useGetAllCoursesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteCourse, { isSuccess, error: errorDelete }] =
    useDeleteCourseMutation({});

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.6,
      minWidth: 180,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1.5,
      minWidth: 220,
    },
    {
      field: "rating",
      headerName: "Ratings",
      flex: 0.6,
      minWidth: 100,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.7,
      minWidth: 110,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.8,
      minWidth: 130,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.4,
      minWidth: 80,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return (
          <Link
            href={`/admin/edit-course/${params.row.id}`}
            className="flex h-full w-full items-center justify-center"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.07] bg-white text-black transition-all hover:border-[#42d383]/30 hover:bg-[#42d383]/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:hover:bg-[#42d383]/10">
              <FiEdit2 size={17} />
            </span>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.4,
      minWidth: 90,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setCourseId(params.row.id);
            }}
            className="!min-w-0 !p-0"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/10 bg-red-500/[0.04] text-red-500 transition-all hover:border-red-500/20 hover:bg-red-500/10 dark:text-red-400">
              <AiOutlineDelete size={18} />
            </span>
          </Button>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          purchased: item.purchased,
          ratings: item.ratings,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course role deleted successfully");
      setOpen(false);
    }

    if (errorDelete) {
      if ("data" in errorDelete) {
        const errorMessage = errorDelete as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, errorDelete]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full px-3 pb-10 pt-6 sm:px-5 sm:pt-8 lg:px-8 lg:pt-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Page Header */}
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#42d383]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#279c60] dark:text-[#5be69a] sm:text-xs">
                Course Management
              </span>

              <h1 className="mt-3 text-xl font-semibold tracking-tight text-black dark:text-white sm:text-2xl lg:text-3xl">
                All Courses
              </h1>

              <p className="mt-1.5 max-w-[650px] text-xs leading-5 text-black/50 dark:text-white/50 sm:text-sm sm:leading-6">
                Manage, edit, and remove courses available on  Learnix
                platform.
              </p>
            </div>

            <div className="flex w-fit items-center rounded-full border border-black/[0.07] bg-white/70 px-3 py-1.5 text-xs font-medium text-black/50 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/50">
              {rows.length} {rows.length === 1 ? "Course" : "Courses"}
            </div>
          </div>

          {/* Courses Table */}
          <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white/75 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)]">
            <Box
              sx={{
                width: "100%",
                height: {
                  xs: "calc(100vh - 250px)",
                  sm: "calc(100vh - 235px)",
                  md: "calc(100vh - 225px)",
                  lg: "calc(100vh - 220px)",
                },
                minHeight: "500px",

                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                  color: theme === "dark" ? "#fff" : "#111827",
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                  },
                },

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor:
                    theme === "dark" ? "#182235" : "#f8fafc",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.07)",
                  minHeight: "56px !important",
                  maxHeight: "56px !important",
                },

                "& .MuiDataGrid-columnHeader": {
                  color: theme === "dark" ? "#fff" : "#111827",
                  fontWeight: 600,
                  outline: "none !important",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                },

                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#111827",
                },

                "& .MuiDataGrid-menuIconButton": {
                  color: theme === "dark" ? "#fff" : "#111827",
                },

                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#111827",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.06)",
                  transition: "background-color 0.2s ease",
                },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255,255,255,0.035)"
                      : "rgba(0,0,0,0.025)",
                },

                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                  outline: "none !important",
                  color: theme === "dark" ? "#fff" : "#111827",
                },

                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },

                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor:
                    theme === "dark" ? "#111827" : "#ffffff",
                  overflowX: "auto",
                },

                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#111827",
                  borderTop:
                    theme === "dark"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(0,0,0,0.07)",
                  backgroundColor:
                    theme === "dark" ? "#182235" : "#f8fafc",
                },

                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#111827",
                },

                "& .MuiTablePagination-selectIcon": {
                  color: theme === "dark" ? "#fff" : "#111827",
                },

                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark"
                      ? "#b7ebde !important"
                      : "#374151 !important",
                },

                "& .MuiCheckbox-root.Mui-checked": {
                  color: "#42d383 !important",
                },

                "& .MuiDataGrid-selectedRowCount": {
                  color: theme === "dark" ? "#fff" : "#111827",
                },

                "& .MuiDataGrid-overlay": {
                  backgroundColor:
                    theme === "dark" ? "#111827" : "#ffffff",
                },

                "& .MuiDataGrid-scrollbarFiller": {
                  backgroundColor:
                    theme === "dark" ? "#182235" : "#f8fafc",
                },
              }}
            >
              <DataGrid
                checkboxSelection
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
              />
            </Box>
          </div>

          {/* Delete Modal */}
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="delete-course-modal-title"
              aria-describedby="delete-course-modal-description"
            >
              <Box
                className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_25px_80px_rgba(0,0,0,0.18)] outline-none dark:border-white/[0.08] dark:bg-slate-900 sm:p-7"
              >
                <div className="mb-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500 dark:text-red-400">
                    <AiOutlineDelete size={21} />
                  </div>

                  <h1
                    id="delete-course-modal-title"
                    className="text-lg font-semibold tracking-tight text-black dark:text-white sm:text-xl"
                  >
                    Delete this course?
                  </h1>

                  <p
                    id="delete-course-modal-description"
                    className="mt-2 text-sm leading-6 text-black/50 dark:text-white/50"
                  >
                    This action will permanently remove the selected
                    course. Please make sure you want to continue.
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex h-11 w-full items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.02] px-5 text-sm font-semibold text-black/70 transition-all hover:bg-black/[0.05] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/70 dark:hover:bg-white/[0.07] sm:w-[120px]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex h-11 w-full items-center justify-center rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition-all hover:bg-red-600 sm:w-[120px]"
                  >
                    Delete
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCourses;


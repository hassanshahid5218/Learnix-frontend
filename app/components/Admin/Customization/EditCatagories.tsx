
"use client";

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }

    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfylly");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) =>
        i._id === id ? { ...i, title: value } : i
      )
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [
        ...prevCategory,
        { title: "" },
      ]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return (
      JSON.stringify(originalCategories) ===
      JSON.stringify(newCategories)
    );
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  const hasChanges = data?.layout?.categories
    ? !areCategoriesUnchanged(
        data.layout.categories,
        categories
      )
    : false;

  const hasEmptyCategory = isAnyCategoryTitleEmpty(categories);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-[calc(100vh-80px)] w-full px-3 pb-10 pt-6 sm:px-5 sm:pt-8 lg:px-8 lg:pt-10">
          <div className="mx-auto w-full max-w-[1100px]">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-flex rounded-full bg-[#42d383]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#279c60] dark:text-[#5be69a] sm:text-xs">
                Category Customization
              </span>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white sm:text-2xl lg:text-3xl">
                    All Categories
                  </h1>

                  <p className="mt-1.5 max-w-[650px] text-xs leading-5 text-black/50 dark:text-white/50 sm:text-sm sm:leading-6">
                    Manage the categories displayed throughout 
                    Learnix.
                  </p>
                </div>

                <div className="flex w-fit items-center rounded-full border border-black/[0.07] bg-white/70 px-3 py-1.5 text-xs font-medium text-black/50 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/50">
                  {categories.length}{" "}
                  {categories.length === 1
                    ? "Category"
                    : "Categories"}
                </div>
              </div>
            </div>

            {/* Categories Card */}
            <div className="rounded-2xl border border-black/[0.07] bg-white/75 p-3 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:p-5 lg:p-7">
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <div>
                  <h2 className="text-sm font-semibold text-black dark:text-white sm:text-base">
                    Course Categories
                  </h2>

                  <p className="mt-0.5 text-[11px] text-black/40 dark:text-white/40 sm:text-xs">
                    Edit or remove your existing categories.
                  </p>
                </div>
              </div>

              {/* Category List */}
              <div className="space-y-3 sm:space-y-4">
                {categories &&
                  categories.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="group flex items-center gap-3 rounded-2xl border border-black/[0.07] bg-black/[0.015] p-3 transition-all duration-200 hover:border-black/[0.12] hover:bg-black/[0.025] dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.035] sm:gap-4 sm:p-4"
                      >
                        {/* Number */}
                        <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#42d383]/10 text-xs font-semibold text-[#279c60] dark:text-[#5be69a] sm:flex">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Input */}
                        <div className="min-w-0 flex-1">
                          <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.12em] text-black/35 dark:text-white/35 sm:text-[10px]">
                            Category {index + 1}
                          </label>

                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              handleCategoriesAdd(
                                item._id,
                                e.target.value
                              )
                            }
                            placeholder="Enter category title"
                            className="w-full rounded-xl border border-black/[0.07] bg-white px-3 py-2.5 text-sm font-medium text-black outline-none transition-all placeholder:text-black/25 focus:border-[#42d383]/50 focus:ring-4 focus:ring-[#42d383]/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/25 sm:px-4 sm:py-3 sm:text-base"
                          />
                        </div>

                        {/* Delete */}
                        <button
                          type="button"
                          aria-label={`Delete category ${index + 1}`}
                          onClick={() => {
                            setCategories((prevCategory: any) =>
                              prevCategory.filter(
                                (i: any) => i._id !== item._id
                              )
                            );
                          }}
                          className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/[0.04] text-red-500 transition-all hover:border-red-500/20 hover:bg-red-500/10 dark:text-red-400 sm:h-10 sm:w-10"
                        >
                          <AiOutlineDelete className="text-base sm:text-lg" />
                        </button>
                      </div>
                    );
                  })}
              </div>

              {/* Add Category */}
              <button
                type="button"
                onClick={newCategoriesHandler}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-black/[0.015] px-4 py-3 text-sm font-medium text-black/55 transition-all hover:border-[#42d383]/40 hover:bg-[#42d383]/5 hover:text-[#279c60] dark:border-white/15 dark:bg-white/[0.02] dark:text-white/55 dark:hover:border-[#42d383]/40 dark:hover:bg-[#42d383]/5 dark:hover:text-[#5be69a] sm:mt-6 sm:py-3.5"
              >
                <IoMdAddCircleOutline className="text-xl" />
                Add New Category
              </button>
            </div>

            {/* Save Section */}
            <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-black/70 dark:text-white/70">
                  {hasChanges
                    ? hasEmptyCategory
                      ? "Please complete all category titles before saving."
                      : "You have unsaved changes."
                    : "Your categories are up to date."}
                </p>

                <p className="mt-0.5 text-xs text-black/40 dark:text-white/40">
                  Changes will be reflected across your Learnix.
                </p>
              </div>

              <button
                type="button"
                disabled={!hasChanges || hasEmptyCategory}
                onClick={
                  !hasChanges || hasEmptyCategory
                    ? () => null
                    : handleEdit
                }
                className={`flex h-11 w-full shrink-0 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-all sm:w-[120px] ${
                  !hasChanges || hasEmptyCategory
                    ? "cursor-not-allowed bg-[#cccccc34] text-black/40 dark:text-white/40"
                    : "cursor-pointer bg-[#42d383] text-black hover:bg-[#35bf74] dark:text-white"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;


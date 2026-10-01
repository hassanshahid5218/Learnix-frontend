
"use client";

import { styles } from "@/app/styles/styles";

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] =
    useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }

    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  const hasChanges =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subTitle !== subTitle ||
    data?.layout?.banner?.image !== image;

  return (
    <div className="relative w-full px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      {/* Background Decorative Circle */}
      <div className="pointer-events-none absolute left-1/2 top-16 -z-0 h-[280px] w-[280px] -translate-x-1/2 rounded-full hero_animation opacity-60 sm:h-[380px] sm:w-[380px] lg:left-[30%] lg:top-24 lg:h-[500px] lg:w-[500px] lg:-translate-x-0 1500px:left-[28%] 1500px:h-[650px] 1500px:w-[650px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-white/70 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_20px_70px_rgba(0,0,0,0.18)] lg:min-h-[calc(100vh-120px)] lg:flex-row">
        {/* Image Section */}
        <div className="relative flex w-full items-center justify-center px-5 pb-6 pt-10 sm:px-8 sm:pb-8 lg:w-[42%] lg:px-8 lg:py-12 xl:w-[40%]">
          <div className="relative flex w-full max-w-[520px] items-center justify-center">
            {/* Image Glow */}
            <div className="absolute h-[220px] w-[220px] rounded-full bg-[#42d383]/10 blur-3xl sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]" />

            <div className="relative flex w-full items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Hero banner preview"
                  className="relative z-10 max-h-[320px] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] sm:max-h-[380px] lg:max-h-[460px] xl:max-h-[520px]"
                />
              ) : (
                <div className="flex h-[260px] w-full max-w-[420px] items-center justify-center rounded-2xl border border-dashed border-black/10 bg-black/[0.02] text-sm text-black/40 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/40 sm:h-[320px]">
                  No hero image selected
                </div>
              )}

              {/* Image Upload */}
              <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />

              <label
                htmlFor="banner"
                className="absolute bottom-2 right-2 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-black/[0.03] dark:border-white/10 dark:bg-[#111827] dark:hover:bg-white/[0.06] sm:bottom-4 sm:right-4 sm:h-12 sm:w-12"
                title="Change hero image"
              >
                <AiOutlineCamera className="text-xl text-black dark:text-white sm:text-[21px]" />
              </label>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-black/[0.07] dark:bg-white/[0.08] lg:my-10 lg:mx-0 lg:h-auto lg:w-px" />

        {/* Content Editor */}
        <div className="flex w-full flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:w-[58%] lg:px-10 xl:px-14 1500px:w-[60%] 1500px:px-20">
          {/* Section Heading */}
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex rounded-full bg-[#42d383]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#279c60] dark:bg-[#42d383]/10 dark:text-[#5be69a] sm:text-xs">
              Hero Customization
            </span>

            <h2 className="mt-3 text-xl font-semibold tracking-tight text-black dark:text-white sm:text-2xl lg:text-3xl">
              Customize your hero section
            </h2>

            <p className="mt-2 max-w-[650px] text-xs leading-5 text-black/50 dark:text-white/50 sm:text-sm sm:leading-6">
              Update the main heading, supporting text, and banner image
              displayed on your Learnix homepage.
            </p>
          </div>

          {/* Title */}
          <div className="w-full">
            <label
              htmlFor="hero-title"
              className={`${styles.label} mb-2 block !text-sm font-medium sm:!text-base`}
            >
              Hero Title
            </label>

            <textarea
              id="hero-title"
              rows={3}
              className="w-full resize-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-lg font-semibold leading-relaxed text-black outline-none transition-all placeholder:text-black/25 focus:border-[#42d383]/50 focus:bg-white focus:ring-4 focus:ring-[#42d383]/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-white/[0.04] sm:px-5 sm:py-4 sm:text-2xl lg:text-3xl xl:text-4xl"
              placeholder="Improve Your Online Learning Experience Better Instantly"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Subtitle */}
          <div className="mt-5 w-full sm:mt-6">
            <label
              htmlFor="hero-subtitle"
              className={`${styles.label} mb-2 block !text-sm font-medium sm:!text-base`}
            >
              Hero Subtitle
            </label>

            <textarea
              id="hero-subtitle"
              rows={4}
              className="w-full resize-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm leading-6 text-black outline-none transition-all placeholder:text-black/25 focus:border-[#42d383]/50 focus:bg-white focus:ring-4 focus:ring-[#42d383]/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/25 dark:focus:bg-white/[0.04] sm:px-5 sm:py-4 sm:text-base lg:text-lg"
              placeholder="Improve Your Online Learning Experience Better Instantly"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          {/* Save Area */}
          <div className="mt-7 flex flex-col gap-3 border-t border-black/[0.07] pt-6 dark:border-white/[0.08] sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-black/40 dark:text-white/40 sm:max-w-[60%]">
              {hasChanges
                ? "You have unsaved changes."
                : "Your hero section is up to date."}
            </p>

            <div
              className={`${styles.button} !flex !min-h-[44px] !h-[44px] !w-full !items-center !justify-center !rounded-xl !px-6 !text-sm sm:!w-[120px] ${
                hasChanges
                  ? "!cursor-pointer !bg-[#42d383] hover:!bg-[#35bf74]"
                  : "!cursor-not-allowed !bg-[#cccccc34]"
              } ${
                isLoading ? "!cursor-not-allowed !opacity-70" : ""
              }`}
              onClick={hasChanges && !isLoading ? handleEdit : () => null}
            >
              {isLoading ? "Saving..." : "Save"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;


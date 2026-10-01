
"use client";

import {
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

import React, { FC, useEffect, useState } from "react";

import Loader from "../Loader";

import { useRouter } from "next/navigation";

import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch, isLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="relative w-full overflow-hidden">
          {/* ================= BACKGROUND DECORATION ================= */}
          <div className="pointer-events-none absolute -left-[120px] top-[80px] h-[280px] w-[280px] rounded-full bg-[#39c1f3]/10 blur-[2px] sm:h-[380px] sm:w-[380px] md:-left-[150px] md:h-[450px] md:w-[450px] lg:-left-[120px] lg:top-[120px] lg:h-[520px] lg:w-[520px] xl:left-[40px] xl:h-[620px] xl:w-[620px]">
            <div className="hero_animation h-full w-full rounded-full" />
          </div>

          {/* ================= HERO CONTENT ================= */}
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-[92%] max-w-[1500px] flex-col items-center justify-center gap-8 py-10 sm:w-[90%] sm:py-12 md:gap-10 lg:min-h-[calc(100vh-80px)] lg:flex-row lg:gap-4 lg:py-8">
            {/* ================= HERO IMAGE ================= */}
            <div className="flex w-full items-center justify-center lg:w-[43%] lg:justify-end">
              <div className="relative flex w-full max-w-[500px] items-center justify-center lg:max-w-none">
                {image && (
                  <img
                    src={image}
                    alt="Hero banner"
                    className="relative z-10 h-auto w-[75%] max-w-[430px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02] sm:w-[65%] sm:max-w-[480px] md:w-[60%] lg:w-[120%] lg:max-w-[560px] xl:w-[115%] xl:max-w-[650px]"
                  />
                )}
              </div>
            </div>

            {/* ================= HERO TEXT ================= */}
            <div className="flex w-full flex-col items-center text-center lg:w-[57%] lg:items-start lg:pl-6 lg:text-left xl:pl-10">
              {/* Small badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#39c1f3]/20 bg-[#39c1f3]/10 px-4 py-2 backdrop-blur-sm sm:mb-5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#39c1f3]" />

                <span className="text-xs font-medium tracking-wide text-[#269bc8] dark:text-[#70d8ff] sm:text-sm">
                  Learn. Build. Grow.
                </span>
              </div>

              {/* Main title */}
              <p className="w-full max-w-[900px] px-1 font-Poppins text-[34px] font-[700] leading-[1.15] tracking-[-1px] text-gray-900 dark:text-white sm:px-2 sm:text-[42px] sm:leading-[1.15] md:text-[50px] lg:px-0 lg:text-[52px] xl:text-[64px] 2xl:text-[70px]">
                {title}
              </p>

              {/* Subtitle */}
              <p className="mt-4 w-full max-w-[700px] px-2 text-[14px] font-[400] leading-6 text-gray-600 dark:text-gray-300 sm:mt-5 sm:px-0 sm:text-[16px] sm:leading-7 md:text-[18px] lg:mt-6 xl:text-[20px]">
                {subTitle}
              </p>

              {/* ================= SEARCH ================= */}
              <div className="mt-7 w-full max-w-[620px] sm:mt-8 lg:mt-9">
                <div className="relative flex h-[52px] w-full items-center overflow-hidden rounded-xl border border-gray-200 bg-white/90 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 focus-within:border-[#39c1f3] focus-within:shadow-[0_10px_35px_rgba(57,193,243,0.15)] dark:border-white/[0.08] dark:bg-[#171c2e]/90 dark:shadow-[0_10px_35px_rgba(0,0,0,0.25)] sm:h-[56px]">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent px-4 text-[14px] text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500 sm:px-5 sm:text-[15px]"
                  />

                  <div
                    className="flex h-full w-[52px] shrink-0 cursor-pointer items-center justify-center bg-[#39c1f3] transition-all duration-300 hover:bg-[#25aeda] active:scale-95 sm:w-[58px]"
                    onClick={handleSearch}
                  >
                    <BiSearch
                      className="text-white"
                      size={24}
                    />
                  </div>
                </div>
              </div>

              {/* Small supporting text */}
              <p className="mt-4 px-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
                Explore courses and start learning today.
              </p>
            </div>
          </div>

          {/* ================= BOTTOM DECORATION ================= */}
          <div className="pointer-events-none absolute -bottom-[180px] -right-[180px] h-[350px] w-[350px] rounded-full bg-[#39c1f3]/5 blur-3xl sm:h-[450px] sm:w-[450px] lg:-bottom-[250px] lg:-right-[180px] lg:h-[550px] lg:w-[550px]" />
        </section>
      )}
    </>
  );
};

export default Hero;


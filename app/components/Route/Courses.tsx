

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";

import React, { useEffect, useState } from "react";

import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <section className="w-full overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-[92%] max-w-[1500px] sm:w-[90%] 800px:w-[86%]">
        {/* ================= SECTION HEADER ================= */}
        <div className="mx-auto mb-8 max-w-[850px] text-center sm:mb-10 md:mb-12">
          {/* Small badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#39c1f3]/20 bg-[#39c1f3]/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#39c1f3]" />

            <span className="text-xs font-medium tracking-wide text-[#269bc8] dark:text-[#70d8ff] sm:text-sm">
              Explore Our Courses
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-Poppins text-[27px] font-[700] leading-[1.25] tracking-[-0.5px] text-gray-900 dark:text-white sm:text-[34px] sm:leading-[1.25] md:text-[40px] lg:text-[46px]">
            Expand Your Career{" "}
            <span className="text-gradient">Opportunities</span>
            <br className="hidden sm:block" /> With Our Courses
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[650px] px-2 text-[13px] leading-6 text-gray-500 dark:text-gray-400 sm:text-[15px] sm:leading-7 md:text-[16px]">
            Learn practical skills, strengthen your knowledge, and take the
            next step toward your career goals.
          </p>
        </div>

        {/* ================= COURSE GRID ================= */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:gap-7 xl:gap-8 1500px:grid-cols-4 1500px:gap-8">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {!isLoading && courses && courses.length === 0 && (
          <div className="flex min-h-[180px] w-full items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-5 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              No courses are available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;


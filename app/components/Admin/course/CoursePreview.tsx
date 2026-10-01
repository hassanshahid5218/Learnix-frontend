

import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import React, { FC } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}) => {
  const discountPercentenge =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentengePrice = discountPercentenge.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-black/10 px-4 py-5 dark:border-white/10 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37a39a]">
          Step 04
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
          Course Preview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50 dark:text-white/50">
          Review how your course will look before creating or publishing it.
        </p>
      </div>

      <div className="space-y-7 px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        {/* Course Player */}
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-black shadow-lg dark:border-white/10">
          <div className="relative w-full">
            <CoursePlayer
              videoUrl={courseData?.demoUrl}
              title={courseData?.title}
            />
          </div>
        </div>

        {/* Pricing */}
        <section className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111827] sm:p-5 lg:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                Course Price
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
                  {courseData?.price === 0
                    ? "Free"
                    : courseData?.price + "5"}
                  $
                </h2>

                <h5 className="text-lg text-black/40 line-through dark:text-white/40 sm:text-xl">
                  {courseData?.estimatedPrice}$
                </h5>

                <span className="rounded-full bg-[#37a39a]/10 px-3 py-1.5 text-xs font-semibold text-[#27877f] dark:text-[#55cfc4]">
                  {discountPercentengePrice}% Off
                </span>
              </div>
            </div>

            <div className="flex w-full lg:w-auto">
              <div
                className={`${styles.button} !m-0 !flex !h-11 !w-full !items-center !justify-center !rounded-xl !bg-[#37a39a] !font-Poppins !text-sm shadow-sm transition-all hover:!bg-[#2f9189] sm:!w-[180px]`}
              >
                Buy Now {courseData?.price}$
              </div>
            </div>
          </div>

          {/* Discount */}
          <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name=""
              id=""
              placeholder="Discount code..."
              className={`${styles.input} !m-0 !h-11 !rounded-xl !border-black/10 !bg-black/[0.02] px-4 dark:!border-white/10 dark:!bg-white/[0.03]`}
            />

            <div
              className={`${styles.button} !m-0 !flex !h-11 !w-full !items-center !justify-center !rounded-xl !font-Poppins !text-sm sm:!w-[120px]`}
            >
              Apply
            </div>
          </div>

          {/* Included */}
          <div className="mt-5 grid grid-cols-1 gap-2 border-t border-black/10 pt-5 dark:border-white/10 sm:grid-cols-2">
            <p className="text-sm text-black/55 dark:text-white/55">
              ✓ Source code included
            </p>

            <p className="text-sm text-black/55 dark:text-white/55">
              ✓ Full course access
            </p>

            <p className="text-sm text-black/55 dark:text-white/55">
              ✓ Practical learning content
            </p>

            <p className="text-sm text-black/55 dark:text-white/55">
              ✓ Course resources
            </p>
          </div>
        </section>

        {/* Course Overview */}
        <section className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111827] sm:p-5 lg:p-6">
          <div className="border-b border-black/10 pb-5 dark:border-white/10">
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
              {courseData?.name}
            </h1>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Ratings rating={0} />

                  <h5 className="text-sm text-black/55 dark:text-white/55">
                    0 Reviews
                  </h5>
                </div>

                <span className="hidden text-black/20 dark:text-white/20 sm:block">
                  •
                </span>

                <h5 className="text-sm text-black/55 dark:text-white/55">
                  0 Students
                </h5>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="pt-6">
            <h2 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
              What you will learn from this course?
            </h2>

            <div className="mt-5 space-y-3">
              {courseData?.benefits?.map(
                (item: any, index: number) => (
                  <div
                    className="flex items-start gap-3 rounded-xl bg-black/[0.02] px-4 py-3 dark:bg-white/[0.025]"
                    key={index}
                  >
                    <IoIosCheckmarkCircleOutline
                      className="mt-0.5 shrink-0 text-[#37a39a]"
                      size={21}
                    />

                    <p className="text-sm leading-6 text-black/70 dark:text-white/70">
                      {item.title}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/10">
            <h2 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
              What are the prerequisites for starting this course?
            </h2>

            <div className="mt-5 space-y-3">
              {courseData?.prerequisites?.map(
                (item: any, index: number) => (
                  <div
                    className="flex items-start gap-3 rounded-xl bg-black/[0.02] px-4 py-3 dark:bg-white/[0.025]"
                    key={index}
                  >
                    <IoIosCheckmarkCircleOutline
                      className="mt-0.5 shrink-0 text-[#37a39a]"
                      size={21}
                    />

                    <p className="text-sm leading-6 text-black/70 dark:text-white/70">
                      {item.title}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-black/10 pt-6 dark:border-white/10">
            <h2 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
              Course Details
            </h2>

            <p className="mt-4 w-full overflow-hidden whitespace-pre-line text-sm leading-7 text-black/60 dark:text-white/60 sm:text-base">
              {courseData?.description}
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex w-full flex-col-reverse gap-3 border-t border-black/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={prevButton}
            className="h-11 w-full rounded-xl border border-black/10 bg-transparent px-8 text-sm font-medium text-black transition-all duration-200 hover:bg-black/[0.04] dark:border-white/10 dark:text-white dark:hover:bg-white/[0.05] sm:w-[160px]"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={createCourse}
            className="h-11 w-full rounded-xl bg-[#37a39a] px-8 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#2f9189] hover:shadow-md active:scale-[0.98] sm:w-[180px]"
          >
            {isEdit ? "Update" : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;


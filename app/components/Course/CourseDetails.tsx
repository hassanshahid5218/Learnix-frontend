

import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import ContentCourseList from "./ContentCourseList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import defaultImage from "../../../public/assets/avatar.jpg";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountprecentange =
    ((data?.setimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = discountprecentange.toFixed(0);

const isPurchased = user?.courses?.some(
  (item: any) =>
    item?._id?.toString() === data?._id?.toString()
);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-[92%] max-w-[1400px] py-6 sm:w-[90%] sm:py-8 lg:py-10">
        <div className="flex w-full flex-col-reverse gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* ==================== LEFT CONTENT ==================== */}
          <div className="w-full lg:w-[65%] lg:pr-4 xl:pr-8">
            {/* Course Title */}
            <div className="mb-5">
              <h1 className="font-Poppins text-2xl font-semibold leading-tight text-black dark:text-white sm:text-3xl lg:text-[32px] lg:leading-[1.25]">
                {data?.name}
              </h1>
            </div>

            {/* Rating + Students */}
            <div className="mb-8 flex flex-col gap-3 border-b border-gray-200 pb-6 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Ratings rating={data.ratings} />

                <span className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                  {data.reviews?.length} Reviews
                </span>
              </div>

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:text-base">
                {data.purchased} Students
              </span>
            </div>

            {/* ==================== WHAT YOU WILL LEARN ==================== */}
            <section className="mb-10">
              <h2 className="mb-5 font-Poppins text-xl font-semibold text-black dark:text-white sm:text-2xl">
                What you will learn from this course?
              </h2>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-8">
                  {data.benefits?.map((item: any, index: number) => (
                    <div
                      className="flex items-start gap-3"
                      key={index}
                    >
                      <IoMdCheckmarkCircleOutline
                        size={20}
                        className="mt-0.5 flex-shrink-0 text-black dark:text-white"
                      />

                      <p className="text-sm leading-6 text-gray-700 dark:text-gray-300 sm:text-base">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ==================== PREREQUISITES ==================== */}
            <section className="mb-10">
              <h2 className="mb-5 font-Poppins text-xl font-semibold text-black dark:text-white sm:text-2xl">
                What are the prerequisites for starting this course?
              </h2>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                <div className="space-y-4">
                  {data.prerequisites?.map((item: any, index: number) => (
                    <div
                      className="flex items-start gap-3"
                      key={index}
                    >
                      <IoMdCheckmarkCircleOutline
                        size={20}
                        className="mt-0.5 flex-shrink-0 text-black dark:text-white"
                      />

                      <p className="text-sm leading-6 text-gray-700 dark:text-gray-300 sm:text-base">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ==================== COURSE OVERVIEW ==================== */}
            <section className="mb-10">
              <h2 className="mb-5 font-Poppins text-xl font-semibold text-black dark:text-white sm:text-2xl">
                Course Overview
              </h2>

              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
                <ContentCourseList
                  data={data?.courseData}
                  isDemo={true}
                />
              </div>
            </section>

            {/* ==================== COURSE DETAILS ==================== */}
            <section className="mb-10">
              <h2 className="mb-5 font-Poppins text-xl font-semibold text-black dark:text-white sm:text-2xl">
                Course Details
              </h2>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-transparent sm:p-6">
                <p className="w-full overflow-hidden whitespace-pre-line text-sm leading-7 text-gray-700 dark:text-gray-300 sm:text-base sm:leading-8 lg:text-[17px]">
                  {data.description}
                </p>
              </div>
            </section>

            {/* ==================== REVIEWS ==================== */}
            <section className="w-full">
              <div className="mb-6">
                <h2 className="mb-4 font-Poppins text-xl font-semibold text-black dark:text-white sm:text-2xl">
                  Student Reviews
                </h2>

                <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:p-6">
                  <div className="flex items-center gap-3">
                    <Ratings rating={data?.ratings} />

                    <span className="text-lg font-semibold text-black dark:text-white sm:text-xl">
                      {Number.isInteger(data?.ratings)
                        ? data?.ratings.toFixed(1)
                        : data?.ratings.toFixed(2)}
                    </span>
                  </div>

                  <span className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                    Course Rating · {data?.reviews?.length} Reviews
                  </span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div
                      className="w-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-transparent sm:p-6"
                      key={index}
                    >
                      {/* Main Review */}
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full sm:h-[50px] sm:w-[50px]">
                          <Image
                            src={
                              item.user.avatar
                                ? item.user.avatar.url
                                : defaultImage
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Desktop Review Content */}
                        <div className="hidden min-w-0 flex-1 sm:block">
                          <div className="flex flex-wrap items-center gap-2">
                            <h5 className="text-base font-semibold text-black dark:text-white sm:text-lg">
                              {item.user.name}
                            </h5>

                            <Ratings rating={item.rating} />
                          </div>

                          <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300 sm:text-base">
                            {item.comment}
                          </p>

                          <small className="mt-2 block text-gray-500 dark:text-gray-500">
                            {format(item.createdAt)}
                          </small>
                        </div>

                        {/* Mobile Review Rating */}
                        <div className="flex min-w-0 flex-1 flex-col sm:hidden">
                          <h5 className="mb-1 truncate text-base font-semibold text-black dark:text-white">
                            {item.user.name}
                          </h5>

                          <Ratings rating={item.rating} />

                          <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                            {item.comment}
                          </p>

                          <small className="mt-2 text-gray-500 dark:text-gray-500">
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>

                      {/* Replies */}
                      {item.commentReplies?.map(
                        (i: any, index: number) => (
                          <div
                            className="mt-5 flex w-full items-start gap-3 border-l-2 border-gray-200 pl-4 dark:border-gray-700 sm:ml-12 sm:pl-5"
                            key={index}
                          >
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full sm:h-[45px] sm:w-[45px]">
                              <Image
                                src={
                                  i.user.avatar
                                    ? i.user.avatar.url
                                    : defaultImage
                                }
                                width={50}
                                height={50}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="text-base font-semibold text-black dark:text-white sm:text-lg">
                                  {i.user.name}
                                </h5>

                                {i.user.role === "admin" && (
                                  <VscVerifiedFilled className="text-[18px] text-[#0095f6]" />
                                )}
                              </div>

                              <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300 sm:text-base">
                                {i.comment}
                              </p>

                              <small className="mt-2 block text-gray-500 dark:text-gray-500">
                                {format(i.createdAt)}
                              </small>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          {/* ==================== RIGHT COURSE CARD ==================== */}
          <div className="w-full lg:w-[35%]">
            <div className="relative w-full lg:sticky lg:top-[100px] lg:z-30">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-transparent">
                {/* Course Player */}
                <div className="w-full overflow-hidden">
                  <CoursePlayer
                    videoUrl={data?.demoUrl}
                    title={data?.title}
                  />
                </div>

                {/* Price */}
                <div className="px-5 pt-5 sm:px-6 sm:pt-6">
                  <div className="flex flex-wrap items-end gap-3">
                    <h1 className="font-Poppins text-2xl font-semibold text-black dark:text-white sm:text-3xl">
                      {data.price === 0 ? "Free" : data.price + "$"}
                    </h1>

                    <h5 className="pb-1 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                      {data.estimatedPrice}% Off
                    </h5>
                  </div>
                </div>

                {/* Purchase Button */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  {isPurchased ? (
                    <Link
                      className={`${styles.button} !mt-5 !w-full !bg-[crimson] !py-3 font-Poppins text-center !text-base cursor-pointer`}
                      href={`/course-access/${data._id}`}
                    >
                      Enter to Course
                    </Link>
                  ) : (
                    <div
                      className={`${styles.button} !mt-5 !w-full !bg-[crimson] !py-3 font-Poppins text-center !text-base cursor-pointer`}
                      onClick={handleOrder}
                    >
                      Buy Now {data.price}$
                    </div>
                  )}

                  {/* Course Benefits */}
                  <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-800">
                    <p className="pb-2 text-sm text-gray-600 dark:text-gray-400">
                      * Source doce included
                    </p>

                    <p className="pb-2 text-sm text-gray-600 dark:text-gray-400">
                      * Source doce included
                    </p>

                    <p className="pb-2 text-sm text-gray-600 dark:text-gray-400">
                      * Source doce included
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      * Source doce included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== CHECKOUT MODAL ==================== */}
      <>
        {open && (
          <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[95vh] w-full max-w-[500px] overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl dark:bg-gray-950 sm:p-5">
              {/* Close Button */}
              <div className="flex w-full justify-end">
                <IoMdCloseCircleOutline
                  size={34}
                  className="cursor-pointer text-gray-700 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Checkout */}
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret }}
                  >
                    <CheckOutForm
                      setOpen={setOpen}
                      data={data}
                      user={user}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;


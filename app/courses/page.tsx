
// "use client";

// import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import Loader from "../components/Loader";
// import Header from "../components/Header";
// import Heading from "../utils/Heading";
// import { styles } from "../styles/styles";
// import CourseCard from "../components/Course/CourseCard";
// import Footer from "../components/Footer";

// type Props = {};

// const Page = (props: Props) => {
//   const searchParams = useSearchParams();
//   const search = searchParams?.get("title");

//   const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
//   const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

//   const [route, setRoute] = useState("Login");
//   const [open, setOpen] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [category, setCategory] = useState("All");

//   useEffect(() => {
//     if (category === "All") {
//       setCourses(data?.courses);
//     }

//     if (category !== "All") {
//       setCourses(
//         data?.courses.filter((item: any) => item.categories === category)
//       );
//     }

//     if (search) {
//       setCourses(
//         data?.courses.filter((item: any) =>
//           item.name.toLowerCase().includes(search.toLowerCase())
//         )
//       );
//     }
//   }, [data, category, search]);

//   const categories = categoriesData?.layout.categories;

//   return (
//     <div className="min-h-screen w-full">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <Header
//             route={route}
//             setRoute={setRoute}
//             open={open}
//             setOpen={setOpen}
//             activeItem={1}
//           />

//           <main className="w-full">
//             <div className="mx-auto min-h-[70vh] w-[92%] max-w-[1400px] py-10 sm:w-[90%] sm:py-12 lg:py-14">
//               <Heading
//                 title={"All course - ELearning"}
//                 description={"Elearning is a programming community"}
//                 keywords={
//                   "Programming comyunitty, coding skills, expret insights, colaboration, gorwthh"
//                 }
//               />

//               {/* Page Intro */}
//               <div className="mt-8 mb-8 text-center sm:mt-10 sm:mb-10">
//                 <span className="mb-3 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
//                   Explore & Learn
//                 </span>

//                 <h1
//                   className={`${styles.title} !text-[28px] leading-tight sm:!text-[34px] md:!text-[40px]`}
//                 >
//                   Find the Right Course for You
//                 </h1>

//                 <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
//                   Explore our collection of courses and choose a learning
//                   path that matches your goals.
//                 </p>
//               </div>

//               {/* Categories */}
//               <div className="mb-10">
//                 <div className="mb-4 flex items-center justify-between gap-4">
//                   <h2 className="font-Poppins text-lg font-semibold text-black dark:text-white sm:text-xl">
//                     Browse Categories
//                   </h2>

//                   {search && (
//                     <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
//                       Search results for:{" "}
//                       <span className="font-medium text-black dark:text-white">
//                         "{search}"
//                       </span>
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex w-full flex-wrap gap-2.5 sm:gap-3">
//                   {/* All Category */}
//                   <button
//                     type="button"
//                     className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-2.5 ${
//                       category === "All"
//                         ? "border-[crimson] bg-[crimson] text-white shadow-sm"
//                         : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-black dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
//                     }`}
//                     onClick={() => setCategory("All")}
//                   >
//                     All
//                   </button>

//                   {categories &&
//                     categories.map((item: any, index: number) => (
//                       <button
//                         type="button"
//                         key={index}
//                         className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-2.5 ${
//                           category === item._id
//                             ? "border-[crimson] bg-[crimson] text-white shadow-sm"
//                             : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-black dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
//                         }`}
//                         onClick={() => setCategory(item._id)}
//                       >
//                         {item.title}
//                       </button>
//                     ))}
//                 </div>
//               </div>

//               {/* Search Result - Mobile */}
//               {search && (
//                 <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900 sm:hidden">
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Search results for:{" "}
//                     <span className="font-semibold text-black dark:text-white">
//                       "{search}"
//                     </span>
//                   </p>
//                 </div>
//               )}

//               {/* Empty State */}
//               {courses && courses.length === 0 && (
//                 <div className="flex min-h-[45vh] items-center justify-center px-4">
//                   <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center dark:border-gray-800 dark:bg-gray-900 sm:px-10">
//                     <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl shadow-sm dark:bg-gray-800">
//                       🔎
//                     </div>

//                     <p
//                       className={`${styles.label} !m-0 !text-center text-sm leading-6 sm:text-base`}
//                     >
//                       {search
//                         ? "No course found"
//                         : "No courses found in this category. Please try another one!"}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Courses Grid */}
//               {courses && courses.length > 0 && (
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7 2xl:grid-cols-4 2xl:gap-8">
//                   {courses?.map((item: any, index: number) => (
//                     <CourseCard item={item} key={index} />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </main>

//           <Footer />
//         </>
//       )}
//     </div>
//   );
// };

// export default Page;


"use client";

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

import { useSearchParams } from "next/navigation";

import React, { Suspense, useEffect, useState } from "react";

import Loader from "../components/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/styles";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

type Props = {};

const CoursesPageContent = (props: Props) => {
  const searchParams = useSearchParams();

  const search = searchParams?.get("title");

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!data?.courses) {
      setCourses([]);
      return;
    }

    let filteredCourses = data.courses;

    // Filter by category
    if (category !== "All") {
      filteredCourses = filteredCourses.filter(
        (item: any) => item.categories === category
      );
    }

    // Filter by search
    if (search) {
      filteredCourses = filteredCourses.filter((item: any) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setCourses(filteredCourses);
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;

  return (
    <div className="min-h-screen w-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          <main className="w-full">
            <div className="mx-auto min-h-[70vh] w-[92%] max-w-[1400px] py-10 sm:w-[90%] sm:py-12 lg:py-14">
              <Heading
                title={"All course - ELearning"}
                description={"Elearning is a programming community"}
                keywords={
                  "Programming community, coding skills, expert insights, collaboration, growth"
                }
              />

              {/* Page Intro */}
              <div className="mt-8 mb-8 text-center sm:mt-10 sm:mb-10">
                <span className="mb-3 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                  Explore & Learn
                </span>

                <h1
                  className={`${styles.title} !text-[28px] leading-tight sm:!text-[34px] md:!text-[40px]`}
                >
                  Find the Right Course for You
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
                  Explore our collection of courses and choose a learning
                  path that matches your goals.
                </p>
              </div>

              {/* Categories */}
              <div className="mb-10">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="font-Poppins text-lg font-semibold text-black dark:text-white sm:text-xl">
                    Browse Categories
                  </h2>

                  {search && (
                    <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
                      Search results for:{" "}
                      <span className="font-medium text-black dark:text-white">
                        "{search}"
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex w-full flex-wrap gap-2.5 sm:gap-3">
                  {/* All Category */}
                  <button
                    type="button"
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-2.5 ${
                      category === "All"
                        ? "border-[crimson] bg-[crimson] text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-black dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
                    }`}
                    onClick={() => setCategory("All")}
                  >
                    All
                  </button>

                  {categories &&
                    categories.map((item: any, index: number) => (
                      <button
                        type="button"
                        key={index}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-2.5 ${
                          category === item._id
                            ? "border-[crimson] bg-[crimson] text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:text-black dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
                        }`}
                        onClick={() => setCategory(item._id)}
                      >
                        {item.title}
                      </button>
                    ))}
                </div>
              </div>

              {/* Search Result - Mobile */}
              {search && (
                <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900 sm:hidden">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Search results for:{" "}
                    <span className="font-semibold text-black dark:text-white">
                      "{search}"
                    </span>
                  </p>
                </div>
              )}

              {/* Empty State */}
              {courses && courses.length === 0 && (
                <div className="flex min-h-[45vh] items-center justify-center px-4">
                  <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center dark:border-gray-800 dark:bg-gray-900 sm:px-10">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl shadow-sm dark:bg-gray-800">
                      🔎
                    </div>

                    <p
                      className={`${styles.label} !m-0 !text-center text-sm leading-6 sm:text-base`}
                    >
                      {search
                        ? "No course found"
                        : "No courses found in this category. Please try another one!"}
                    </p>
                  </div>
                </div>
              )}

              {/* Courses Grid */}
              {courses && courses.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7 2xl:grid-cols-4 2xl:gap-8">
                  {courses.map((item: any, index: number) => (
                    <CourseCard item={item} key={item?._id || index} />
                  ))}
                </div>
              )}
            </div>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

const Page = (props: Props) => {
  return (
    <Suspense fallback={<Loader />}>
      <CoursesPageContent {...props} />
    </Suspense>
  );
};

export default Page;


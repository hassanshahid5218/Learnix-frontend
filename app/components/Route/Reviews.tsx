
import { styles } from "@/app/styles/styles";

import Image from "next/image";

import React from "react";

import ReviewsCard from "../Reviews/ReviewsCard";

type Props = {};

export const reviews = [
  {
    name: "Mr Noah Smith",
    avatar:
      "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambrige university",
    comment:
    "The content is organized nicely and each section builds on the previous one. Definitely a useful course for improving my development skills."
  },
  {
    name: "Geene Bates",
    avatar:
      "https://randomuser.me/api/portraits/men/7.jpg",
    profession: "Student | Oxford university",
    comment:
    "I enjoyed working through the projects in this course. It helped me understand how the concepts are actually used in real-world applications."

  },
  {
    name: "Miss Amelia Abraham",
    avatar:
      "https://randomuser.me/api/portraits/women/36.jpg",
    profession: "Student | Comsat university",
    comment:
     "Really helpful course! The instructor explains difficult topics in a simple way and the overall learning experience was great."
  },
  {
    name:"Mrs Karina Murillo",
    avatar:
       "https://randomuser.me/api/portraits/women/37.jpg",
    profession: "Student | PIASE university",
    comment:
    "The explanations are clear and beginner-friendly. The practical parts made it much easier to understand the concepts."
  },
  {
    name: "Ms Henrikke Westerlund",
    avatar:
       "https://randomuser.me/api/portraits/women/5.jpg",
    profession: "Student | FAST university",
    comment:
    "I had some basic knowledge before starting this course, but after completing it I feel much more confident in building real projects."
  },
  {
    name: "Mr Marc Hernández",
    avatar:
      "https://randomuser.me/api/portraits/men/7.jpg",
    profession: "Student |  University of Education",
    comment:
       "The course is really well structured and easy to follow. I especially liked how each topic was explained with practical examples."
  }
];

const Reviews = (props: Props) => {
  return (
    <section className="w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1500px] sm:w-[90%] 800px:w-[86%]">
        {/* ================= INTRODUCTION ================= */}
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
          {/* ================= IMAGE ================= */}
          <div className="relative flex w-full items-center justify-center lg:w-1/2 lg:justify-start">
            {/* Decorative background */}
            <div className="absolute -left-5 -top-5 h-[180px] w-[180px] rounded-full bg-[#39c1f3]/10 blur-2xl sm:h-[230px] sm:w-[230px] lg:-left-8 lg:-top-8 lg:h-[300px] lg:w-[300px]" />

            <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-4">
              <Image
                src={require("../../../public/assets/3d-computer-website-loading-speed-test.jpg")}
                alt="Students learning online"
                width={700}
                height={700}
                className="h-auto w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* ================= TEXT ================= */}
          <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#39c1f3]/20 bg-[#39c1f3]/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#39c1f3]" />

              <span className="text-xs font-medium tracking-wide text-[#269bc8] dark:text-[#70d8ff] sm:text-sm">
                Student Experiences
              </span>
            </div>

            {/* Heading */}
            <h3
              className={`${styles.title} !text-[28px] !leading-[1.25] sm:!text-[34px] sm:!leading-[1.25] md:!text-[40px] lg:!text-[42px] xl:!text-[48px]`}
            >
              Our Students Are{" "}
              <span className="text-gradient">Our Strength</span>
              <br className="hidden sm:block" />
              <span className="mt-1 inline-block">
                See What They Say About Us
              </span>
            </h3>

            {/* Description */}
            <p
              className={`${styles.label} mt-5 max-w-[650px] !text-[14px] !leading-6 sm:!text-[15px] sm:!leading-7 md:!text-[16px] lg:mt-6`}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Architecto dolorem, consequuntur vitae facilis minima earum,
              doloribus nemo quisquam, ducimus perferendis qui quos. Iste
              facilis totam illo, placeat alias atque voluptas.
            </p>

            {/* Small stats */}
            <div className="mt-7 grid w-full max-w-[500px] grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-4 text-center dark:border-white/[0.08] dark:bg-white/[0.03] lg:text-left">
                <p className="font-Poppins text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  1K+
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Happy Students
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-4 text-center dark:border-white/[0.08] dark:bg-white/[0.03] lg:text-left">
                <p className="font-Poppins text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                  50+
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Learning Resources
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS GRID ================= */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:gap-7 xl:gap-8">
          {reviews &&
            reviews.map((i, index) => (
              <ReviewsCard item={i} key={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;


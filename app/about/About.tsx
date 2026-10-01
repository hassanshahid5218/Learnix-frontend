"use client";

import React from "react";
import { styles } from "../styles/styles";

type Props = {};

const About = (props: Props) => {
  return (
    <section className="relative w-full overflow-hidden bg-white text-black dark:bg-[#0b1220] dark:text-white">
      {/* =========================
          BACKGROUND DECORATION
      ========================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-3xl dark:bg-blue-500/[0.08]" />

        <div className="absolute -right-32 top-[35%] h-80 w-80 rounded-full bg-purple-500/[0.06] blur-3xl dark:bg-purple-500/[0.08]" />

        <div className="absolute bottom-20 left-[35%] h-64 w-64 rounded-full bg-cyan-500/[0.04] blur-3xl dark:bg-cyan-500/[0.05]" />
      </div>

      {/* =========================
          HERO
      ========================== */}

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 md:px-10 md:pt-24 lg:px-12 lg:pt-28">
        <div className="mx-auto max-w-[950px] text-center">
          {/* Small badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.025] px-4 py-2 dark:border-white/[0.1] dark:bg-white/[0.04]">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55 dark:text-white/55 sm:text-xs">
              About Our Platform
            </span>
          </div>

          {/* Main heading */}

          <h1
            className={`${styles.title} !m-0 !text-center !text-[34px] !leading-[1.15] sm:!text-[42px] md:!text-[50px] lg:!text-[58px]`}
          >
            What is{" "}
            <span className="text-gradient">
              Learnix?
            </span>
          </h1>

          {/* Intro line */}

          <p className="mx-auto mt-6 max-w-[720px] text-[15px] leading-7 text-black/55 dark:text-white/55 sm:text-[16px] sm:leading-8 md:text-[17px]">
            Learn, build, and grow through a learning experience designed
            around practical development and continuous improvement.
          </p>
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================== */}

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 sm:pb-20 md:px-10 lg:px-12 lg:pb-24">
        <div className="relative overflow-hidden rounded-[24px] border border-black/[0.07] bg-white/80 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-[0_20px_70px_rgba(0,0,0,0.18)] sm:rounded-[30px]">
          {/* Top accent */}

          <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

          <div className="px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14">
            {/* Article */}

            <article className="mx-auto max-w-[930px]">
              <p className="font-Poppins text-[15px] leading-7 text-black/70 dark:text-white/70 sm:text-[16px] sm:leading-8 lg:text-[17px]">
                Learnix is a modern e-learning platform designed to make quality education more accessible, practical, and engaging. We believe learning should not be limited by location, schedule, or traditional classroom environments. Our platform brings structured courses, useful resources, and an interactive learning experience together in one place.
              </p>

              <div className="my-8 h-px w-full bg-black/[0.07] dark:bg-white/[0.07] sm:my-10" />

              <p className="font-Poppins text-[15px] leading-7 text-black/70 dark:text-white/70 sm:text-[16px] sm:leading-8 lg:text-[17px]">
                At Learnix, we focus on helping learners develop real-world skills that can be applied beyond the classroom. Our courses are designed around practical knowledge, clear explanations, and hands-on learning so that students can move from understanding concepts to actually using them in real projects and professional environments.
              </p>

              <p className="mt-8 font-Poppins text-[15px] leading-7 text-black/70 dark:text-white/70 sm:text-[16px] sm:leading-8 lg:text-[17px]">
                Whether you are a beginner starting your learning journey or someone looking to strengthen existing skills, Learnix provides courses for different experience levels and learning goals. From technology and programming to professional and creative skills, our goal is to create learning opportunities that support both personal growth and career development.
              </p>

              <div className="my-8 h-px w-full bg-black/[0.07] dark:bg-white/[0.07] sm:my-10" />

              <p className="font-Poppins text-[15px] leading-7 text-black/70 dark:text-white/70 sm:text-[16px] sm:leading-8 lg:text-[17px]">
               We understand that every learner has a different pace and learning style. That is why Learnix provides a flexible environment where students can learn at their own convenience, revisit lessons, track their progress, and continuously build their knowledge. The platform is designed to make learning simple, organized, and easy to follow.
              </p>

              <p className="mt-8 font-Poppins text-[15px] leading-7 text-black/70 dark:text-white/70 sm:text-[16px] sm:leading-8 lg:text-[17px]">
               Learnix is also built around the idea that education becomes more valuable when it is connected to practical experience. Through structured lessons, projects, exercises, and useful learning resources, we encourage students to actively apply what they learn. Our aim is not just to help learners complete courses, but to help them develop confidence and skills they can carry into real-world opportunities.
              </p>

              {/* =========================
                  FOUNDER
              ========================== */}

              <div className="mt-12 border-t border-black/[0.07] pt-8 dark:border-white/[0.07] sm:mt-14 sm:pt-10">
                <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.02] px-5 py-6 dark:border-white/[0.07] dark:bg-white/[0.025] sm:px-7 sm:py-7">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/[0.08] blur-2xl" />

                  <div className="relative">
                    <span className="font-Cursive text-[21px] text-black/80 dark:text-white/80 sm:text-[23px]">
                      Tesar Rahmat Maulana-
                    </span>

                    <h5 className="mt-2 font-Poppins text-[14px] font-medium text-black/50 dark:text-white/50 sm:text-[15px]">
                      Founder and CEO of Becodemy
                    </h5>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


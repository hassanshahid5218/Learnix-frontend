
"use client";

import React from "react";

import { styles } from "../styles/styles";

type Props = {};

const Policy = (props: Props) => {
  return (
    <section className="relative w-full overflow-hidden bg-white text-black dark:bg-[#0b1220] dark:text-white">
      {/* =========================
          BACKGROUND DECORATION
      ========================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-blue-500/[0.05] blur-3xl dark:bg-blue-500/[0.08]" />

        <div className="absolute -right-32 top-[45%] h-80 w-80 rounded-full bg-purple-500/[0.05] blur-3xl dark:bg-purple-500/[0.08]" />

        <div className="absolute bottom-10 left-[40%] h-64 w-64 rounded-full bg-cyan-500/[0.04] blur-3xl dark:bg-cyan-500/[0.05]" />
      </div>

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="relative mx-auto w-full max-w-[1250px] px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-18 md:px-10 md:pt-20 lg:px-12 lg:pb-12 lg:pt-24">
        <div className="mx-auto max-w-[950px] text-center">
          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-black/[0.025] px-4 py-2 dark:border-white/[0.1] dark:bg-white/[0.04]">
            <span className="h-2 w-2 rounded-full bg-blue-500" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55 dark:text-white/55 sm:text-xs">
              Legal &amp; Guidelines
            </span>
          </div>

          {/* Title */}

          <h1
            className={`${styles.title} !m-0 !text-center !text-[32px] !leading-[1.15] sm:!text-[40px] md:!text-[48px] lg:!text-[54px]`}
          >
            Platform Terms and{" "}
            <span className="text-gradient">
              Condition
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[680px] text-[14px] leading-7 text-black/50 dark:text-white/50 sm:text-[15px] sm:leading-8 md:text-[16px]">
            Please review the following terms and conditions carefully before
            using the platform.
          </p>
        </div>
      </div>

      {/* =========================
          POLICY CONTENT
      ========================== */}

      <div className="relative mx-auto w-full max-w-[1100px] px-5 pb-16 sm:px-8 sm:pb-20 md:px-10 lg:px-12 lg:pb-24">
        <div className="relative overflow-hidden rounded-[24px] border border-black/[0.07] bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-[0_20px_70px_rgba(0,0,0,0.18)] sm:rounded-[30px]">
          {/* Accent line */}

          <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

          <div className="px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14">
            <article className="mx-auto max-w-[900px]">
              {/* =========================
                  POLICY SECTION 01
              ========================== */}

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/[0.1] text-xs font-bold text-blue-600 dark:text-blue-400">
                    01
                  </span>

                  <div className="h-px flex-1 bg-black/[0.07] dark:bg-white/[0.07]" />
                </div>

                <p className="font-Poppins text-[15px] leading-8 text-black/70 dark:text-white/70 sm:text-[16px] lg:text-[17px]">
                  Users are expected to provide accurate information when creating an account and to use the platform responsibly. All course materials, videos, documents, and other educational resources are provided for personal learning purposes and should not be copied, redistributed, resold, or shared without proper authorization. Users are also responsible for maintaining the confidentiality of their account credentials.
                </p>
              </div>

              {/* =========================
                  DIVIDER
              ========================== */}

              <div className="my-9 h-px w-full bg-black/[0.07] dark:bg-white/[0.07] sm:my-11" />

              {/* =========================
                  POLICY SECTION 02
              ========================== */}

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/[0.1] text-xs font-bold text-purple-600 dark:text-purple-400">
                    02
                  </span>

                  <div className="h-px flex-1 bg-black/[0.07] dark:bg-white/[0.07]" />
                </div>

                <p className="font-Poppins text-[15px] leading-8 text-black/70 dark:text-white/70 sm:text-[16px] lg:text-[17px]">
                  The platform provides educational content created for learning and skill development purposes. Course availability, pricing, content, and instructors may be updated from time to time to improve the learning experience. Any payments made for courses must be completed through the available payment methods, and access to purchased content is subject to the applicable course and platform policies.
                </p>
              </div>

              {/* =========================
                  DIVIDER
              ========================== */}

              <div className="my-9 h-px w-full bg-black/[0.07] dark:bg-white/[0.07] sm:my-11" />

              {/* =========================
                  POLICY SECTION 03
              ========================== */}

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/[0.1] text-xs font-bold text-cyan-600 dark:text-cyan-400">
                    03
                  </span>

                  <div className="h-px flex-1 bg-black/[0.07] dark:bg-white/[0.07]" />
                </div>

                <p className="font-Poppins text-[15px] leading-8 text-black/70 dark:text-white/70 sm:text-[16px] lg:text-[17px]">
                  We respect the privacy of our users and aim to handle personal information responsibly. Information collected through the platform may be used to provide services, improve the learning experience, communicate important updates, and maintain platform security. By using the platform, users agree to follow these policies and avoid activities that could negatively affect the platform, its users, or its educational services.
                </p>
              </div>

              {/* =========================
                  END NOTE
              ========================== */}

              <div className="mt-10 rounded-2xl border border-blue-500/10 bg-blue-500/[0.035] px-5 py-5 dark:border-blue-400/10 dark:bg-blue-400/[0.04] sm:mt-12 sm:px-6 sm:py-6">
                <p className="font-Poppins text-[13px] leading-6 text-black/50 dark:text-white/50 sm:text-[14px]">
                  These terms are provided as part of the platform information
                  and should be reviewed carefully before using the service.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policy;


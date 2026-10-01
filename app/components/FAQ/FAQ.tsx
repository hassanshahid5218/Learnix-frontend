

"use client";

import { styles } from "@/app/styles/styles";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-full px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-5xl">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-14">
          <span className="mb-4 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            Help Center
          </span>

          <h1
            className={`${styles.title} !text-[28px] leading-tight sm:!text-[34px] md:!text-[40px]`}
          >
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base sm:leading-7">
            Find answers to the most common questions about our courses,
            learning experience, and platform.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mx-auto w-full max-w-4xl">
          <dl className="space-y-4">
            {questions.map((q) => {
              const isActive = activeQuestion === q._id;

              return (
                <div
                  key={q.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "border-gray-300 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-transparent dark:hover:border-gray-700"
                  }`}
                >
                  <dt>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-inset sm:px-6 sm:py-6"
                      onClick={() => toggleQuestion(q._id)}
                      aria-expanded={isActive}
                    >
                      <span
                        className={`pr-2 text-sm font-semibold leading-6 transition-colors duration-200 sm:text-base sm:leading-7 ${
                          isActive
                            ? "text-black dark:text-white"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {q.question}
                      </span>

                      <span
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {isActive ? (
                          <HiMinus className="h-4 w-4" />
                        ) : (
                          <HiPlus className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                  </dt>

                  {isActive && (
                    <dd className="px-5 pb-5 sm:px-6 sm:pb-6">
                      <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                        <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base sm:leading-7">
                          {q.answer}
                        </p>
                      </div>
                    </dd>
                  )}
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;



"use client";

import { styles } from "@/app/styles/styles";

import { useEditCourseMutation } from "@/redux/features/courses/courseApi";

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

import Loader from "../../Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }

    if (layoutSuccess) {
      refetch();
      toast.success("FAQ updated successfylly");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, question: value } : q
      )
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, answer: value } : q
      )
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  // Function to check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  const hasChanges = data?.layout?.faq
    ? !areQuestionsUnchanged(data.layout.faq, questions)
    : false;

  const hasEmptyQuestion = isAnyQuestionEmpty(questions);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative min-h-[calc(100vh-80px)] w-full px-3 pb-8 pt-6 sm:px-5 sm:pt-8 lg:px-8 lg:pt-10">
          <div className="mx-auto w-full max-w-[1250px]">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <span className="inline-flex rounded-full bg-[#42d383]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#279c60] dark:bg-[#42d383]/10 dark:text-[#5be69a] sm:text-xs">
                FAQ Customization
              </span>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white sm:text-2xl lg:text-3xl">
                    Frequently Asked Questions
                  </h1>

                  <p className="mt-1.5 max-w-[700px] text-xs leading-5 text-black/50 dark:text-white/50 sm:text-sm sm:leading-6">
                    Manage the questions and answers displayed in the FAQ
                    section of your Learnix.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full border border-black/[0.07] bg-white/70 px-3 py-1.5 text-xs font-medium text-black/50 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/50">
                    {questions.length}{" "}
                    {questions.length === 1 ? "Question" : "Questions"}
                  </span>
                </div>
              </div>
            </div>

            {/* FAQ Editor */}
            <div className="rounded-2xl border border-black/[0.07] bg-white/75 p-3 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:p-5 lg:p-7">
              <div className="space-y-3 sm:space-y-4">
                {questions.map((q: any, index: number) => (
                  <div
                    key={q._id || index}
                    className="overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.015] transition-all dark:border-white/[0.08] dark:bg-white/[0.02]"
                  >
                    {/* Question Header */}
                    <div className="flex items-start gap-3 p-3 sm:gap-4 sm:p-5">
                      {/* Question Number */}
                      <div className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#42d383]/10 text-xs font-semibold text-[#279c60] dark:text-[#5be69a] sm:flex">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-black/35 dark:text-white/35 sm:text-[11px]">
                          Question {index + 1}
                        </label>

                        <input
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(
                              q._id,
                              e.target.value
                            )
                          }
                          placeholder="Add your question..."
                          className="w-full rounded-xl border border-black/[0.07] bg-white px-3 py-2.5 text-sm font-medium text-black outline-none transition-all placeholder:text-black/25 focus:border-[#42d383]/50 focus:ring-4 focus:ring-[#42d383]/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/25 sm:px-4 sm:py-3 sm:text-base"
                        />
                      </div>

                      {/* Expand / Collapse */}
                      <button
                        type="button"
                        onClick={() => toggleQuestion(q._id)}
                        className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-black transition-all hover:bg-black/[0.04] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] sm:h-10 sm:w-10"
                        aria-label={
                          q.active
                            ? "Collapse question"
                            : "Expand question"
                        }
                      >
                        {q.active ? (
                          <HiMinus className="h-5 w-5" />
                        ) : (
                          <HiPlus className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {/* Answer */}
                    {q.active && (
                      <div className="border-t border-black/[0.06] px-3 pb-4 pt-3 dark:border-white/[0.07] sm:px-5 sm:pb-5 sm:pt-4">
                        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-black/35 dark:text-white/35 sm:text-[11px]">
                          Answer
                        </label>

                        <input
                          className={`${styles.input} !m-0 !min-h-[48px] !w-full !rounded-xl !border !border-black/[0.07] !bg-white !px-3 !py-2.5 !text-sm dark:!border-white/[0.08] dark:!bg-white/[0.03] sm:!px-4 sm:!py-3 sm:!text-base`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(
                              q._id,
                              e.target.value
                            )
                          }
                          placeholder="Add your answer..."
                        />

                        {/* Delete */}
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10 dark:text-red-400"
                            onClick={() => {
                              setQuestions((prevQuestion) =>
                                prevQuestion.filter(
                                  (item: any) =>
                                    item._id !== q._id
                                )
                              );
                            }}
                          >
                            <AiOutlineDelete className="text-base" />
                            Delete FAQ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add FAQ */}
              <button
                type="button"
                onClick={newFaqHandler}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-black/[0.015] px-4 py-3 text-sm font-medium text-black/60 transition-all hover:border-[#42d383]/40 hover:bg-[#42d383]/5 hover:text-[#279c60] dark:border-white/15 dark:bg-white/[0.02] dark:text-white/60 dark:hover:border-[#42d383]/40 dark:hover:bg-[#42d383]/5 dark:hover:text-[#5be69a] sm:mt-6"
              >
                <IoMdAddCircleOutline className="text-xl" />
                Add New FAQ
              </button>
            </div>

            {/* Save Section */}
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <p className="text-sm font-medium text-black/70 dark:text-white/70">
                  {hasChanges
                    ? hasEmptyQuestion
                      ? "Please complete all FAQ fields before saving."
                      : "You have unsaved changes."
                    : "Your FAQ section is up to date."}
                </p>

                <p className="mt-0.5 text-xs text-black/40 dark:text-white/40">
                  Changes will be reflected on the public FAQ section.
                </p>
              </div>

              <div
                className={`${styles.button} !flex !min-h-[44px] !h-[44px] !w-full !items-center !justify-center !rounded-xl !px-6 !text-sm sm:!w-[120px] ${
                  !hasChanges || hasEmptyQuestion
                    ? "!cursor-not-allowed !bg-[#cccccc34]"
                    : "!cursor-pointer !bg-[#42d383] hover:!bg-[#35bf74]"
                }`}
                onClick={
                  !hasChanges || hasEmptyQuestion
                    ? () => null
                    : handleEdit
                }
              >
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;


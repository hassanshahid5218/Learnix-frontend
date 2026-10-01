

"use client";

import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";

import {
  useAddAnwerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/courseApi";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { format } from "timeago.js";
import defaultImage from "../../../public/assets/avatar.jpg";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [answer, setAnswer] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [replyActive, setReplyActive] = useState(false);

  const [
    addnewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnwerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const { data: courseData, refetch: courseRefetch } =
    useGetCourseDetailsQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const course = courseData?.course;

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cant't be empty");
    } else {
      console.log({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });

      addnewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();

      toast.success("Question added successfully");

      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question from ${data[activeVideo].title}`,
        userId: user._id,
      });
    }

    if (answerSuccess) {
      setAnswer("");
      refetch();

      toast.success("Answer added successfully");

      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Question Reply Received",
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }

    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();

      toast.success("Answer added successfully");

      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review from ${data[activeVideo].title}`,
        userId: user._id,
      });
    }

    if (replySuccess) {
      setReply("");
      courseRefetch();

      toast.success("Reply added successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({
        review,
        rating,
        courseId: id,
      });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({
          comment: reply,
          courseId: id,
          reviewId: reviewId,
        });
      }
    }
  };

  const tabs = ["Overview", "Recources", "Q&A", "Reviews"];

  return (
    <div className="mx-auto w-[94%] py-4 sm:w-[92%] md:w-[90%] lg:w-[86%]">
      {/* Video Player */}
      <div className="overflow-hidden rounded-xl border border-black/10 shadow-sm dark:border-white/10">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
      </div>

      {/* Lesson Navigation */}
      <div className="my-4 flex w-full items-center justify-between gap-3">
        <button
          type="button"
          disabled={activeVideo === 0}
          className={`${styles.button} !min-h-[42px] !w-auto !px-3 !py-0 text-sm text-white transition-all sm:!px-5 sm:text-base ${
            activeVideo === 0
              ? "!cursor-not-allowed opacity-50"
              : "hover:-translate-y-[1px]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-1 text-base sm:mr-2 sm:text-lg" />
          <span className="hidden xs:inline sm:inline">Prev Lesson</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <div className="hidden max-w-[45%] truncate text-center text-xs font-medium text-black/50 dark:text-white/50 sm:block">
          Lesson {activeVideo + 1} of {data.length}
        </div>

        <button
          type="button"
          disabled={data.length - 1 === activeVideo}
          className={`${styles.button} !min-h-[42px] !w-auto !px-3 !py-0 text-sm text-white transition-all sm:!px-5 sm:text-base ${
            data.length - 1 === activeVideo
              ? "!cursor-not-allowed opacity-50"
              : "hover:-translate-y-[1px]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <span className="hidden xs:inline sm:inline">Next Lesson</span>
          <span className="sm:hidden">Next</span>
          <AiOutlineArrowRight className="ml-1 text-base sm:ml-2 sm:text-lg" />
        </button>
      </div>

      {/* Current Lesson Title */}
      <div className="mb-5 mt-4">
        <h1 className="break-words text-xl font-semibold leading-tight text-black dark:text-white sm:text-2xl md:text-[25px]">
          {data[activeVideo].title}
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 w-full overflow-x-auto rounded-xl border border-black/10 bg-slate-500/10 p-1.5 shadow-sm backdrop-blur dark:border-white/10">
        <div className="flex min-w-max items-center">
          {tabs.map((text, index) => (
            <button
              type="button"
              key={index}
              className={`relative whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all sm:px-6 sm:text-base md:text-lg ${
                activeBar === index
                  ? "bg-white text-red-500 shadow-sm dark:bg-slate-800"
                  : "text-black/60 hover:bg-white/50 hover:text-black dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeBar === 0 && (
        <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5 md:p-6">
          <h2 className="mb-3 text-lg font-semibold text-black dark:text-white sm:text-xl">
            About this lesson
          </h2>

          <p className="whitespace-pre-line break-words text-sm leading-7 text-black/70 dark:text-white/75 sm:text-base md:text-[18px]">
            {data[activeVideo]?.description}
          </p>
        </div>
      )}

      {/* Resources */}
      {activeBar === 1 && (
        <div className="space-y-3">
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-black/10 bg-black/[0.02] p-4 transition-all hover:border-black/20 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 sm:p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                {item.title && (
                  <h2 className="break-words text-sm font-semibold text-black dark:text-white sm:text-base md:text-lg">
                    {item.title}:
                  </h2>
                )}

                <a
                  href={item.url}
                  className="break-all text-sm text-[#4395c4] transition-colors hover:underline sm:text-base md:text-lg"
                >
                  {item.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Q&A */}
      {activeBar === 2 && (
        <div>
          {/* Question Form */}
          <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <Image
                src={user.avatar ? user.avatar.url : defaultImage}
                width={50}
                height={50}
                alt=""
                className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-[50px] sm:w-[50px]"
              />

              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                cols={40}
                rows={5}
                placeholder="Write your question..."
                name=""
                id=""
                className="min-h-[110px] w-full resize-y rounded-lg border border-black/10 bg-transparent p-3 text-sm font-Poppins text-black outline-none transition-all placeholder:text-black/40 focus:border-red-500 dark:border-white/15 dark:text-white dark:placeholder:text-white/40 sm:text-base md:text-[18px]"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className={`${styles.button} !h-[40px] !w-[110px] !text-sm sm:!w-[120px] sm:!text-[18px] ${
                  questionCreationLoading
                    ? "!cursor-not-allowed opacity-60"
                    : ""
                }`}
                onClick={
                  questionCreationLoading ? () => {} : handleQuestion
                }
              >
                {questionCreationLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          <div className="my-6 h-px w-full bg-black/10 dark:bg-white/10" />

          <CommentReply
            data={data}
            activeVideo={activeVideo}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            setAnswerId={setAnswerId}
            questionId={questionId}
            setQuestionId={setQuestionId}
            answerCreationLoading={answerCreationLoading}
            replyActive={replyActive}
            setReplyActive={setReplyActive}
          />
        </div>
      )}

      {/* Reviews */}
      {activeBar === 3 && (
        <div>
          {/* Review Form */}
          {!isReviewExists && (
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <Image
                  src={user.avatar ? user.avatar.url : defaultImage}
                  width={50}
                  height={50}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-[50px] sm:w-[50px]"
                />

                <div className="min-w-0 flex-1">
                  <h5 className="mb-2 text-base font-medium text-black dark:text-white sm:text-lg md:text-[20px]">
                    Give a Rating
                    <span className="text-red-500">*</span>
                  </h5>

                  <div className="mb-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          className="cursor-pointer transition-transform hover:scale-110"
                          color="rgb(246, 186, 0)"
                          size={24}
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className="cursor-pointer transition-transform hover:scale-110"
                          color="rgb(246, 186, 0)"
                          size={24}
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>

                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    cols={40}
                    rows={5}
                    placeholder="Write your review..."
                    name=""
                    id=""
                    className="min-h-[110px] w-full resize-y rounded-lg border border-black/10 bg-transparent p-3 text-sm font-Poppins text-black outline-none transition-all placeholder:text-black/40 focus:border-red-500 dark:border-white/15 dark:text-white dark:placeholder:text-white/40 sm:text-base md:text-[18px]"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className={`${styles.button} !h-[40px] !w-[110px] !text-sm sm:!w-[120px] sm:!text-[18px] ${
                    reviewCreationLoading
                      ? "!cursor-not-allowed opacity-60"
                      : ""
                  }`}
                  onClick={
                    reviewCreationLoading ? () => {} : handleReviewSubmit
                  }
                >
                  {reviewCreationLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          )}

          <div className="my-6 h-px w-full bg-black/10 dark:bg-white/10" />

          {/* Reviews List */}
          <div className="w-full space-y-4">
            {(course?.reviews && [...course.reviews].reverse())?.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border border-black/10 bg-black/[0.02] p-4 text-black dark:border-white/10 dark:bg-white/[0.02] dark:text-white sm:p-5"
                >
                  {/* Review Header */}
                  <div className="flex items-start gap-3">
                    <Image
                      src={
                        item.user.avatar
                          ? item.user.avatar.url
                          : defaultImage
                      }
                      width={50}
                      height={50}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-[50px] sm:w-[50px]"
                    />

                    <div className="min-w-0 flex-1">
                      <h1 className="break-words text-base font-semibold sm:text-lg">
                        {item?.user.name}
                      </h1>

                      <div className="my-1">
                        <Ratings rating={item.rating} />
                      </div>

                      <p className="break-words text-sm leading-6 text-black/75 dark:text-white/75 sm:text-base">
                        {item.comment}
                      </p>

                      <small className="mt-1 block text-xs text-black/45 dark:text-white/45">
                        {format(item.createdAt)}
                      </small>
                    </div>
                  </div>

                  {/* Admin Reply Button */}
                  {user.role === "admin" &&
                    item.commentReplies.length === 0 && (
                      <button
                        type="button"
                        className="mt-4 ml-12 text-sm font-medium text-red-500 transition-colors hover:text-red-600 hover:underline sm:ml-[66px]"
                        onClick={() => {
                          setIsReviewReply(!isReviewReply);
                          setReviewId(item._id);
                        }}
                      >
                        Add Reply
                      </button>
                    )}

                  {/* Review Reply Input */}
                  {isReviewReply && reviewId === item._id && (
                    <div className="relative mt-3 flex w-full sm:ml-[66px] sm:w-[calc(100%-66px)]">
                      <input
                        type="text"
                        placeholder="Enter your reply"
                        className="w-full rounded-lg border border-black/10 bg-transparent p-3 pr-20 text-sm text-black outline-none focus:border-red-500 dark:border-white/15 dark:text-white sm:text-base"
                        value={reply}
                        onChange={(e: any) => setReply(e.target.value)}
                      />

                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-red-500 hover:underline disabled:opacity-50"
                        onClick={handleReviewReplySubmit}
                        disabled={replyCreationLoading}
                      >
                        {replyCreationLoading ? "..." : "Submit"}
                      </button>
                    </div>
                  )}

                  {/* Review Replies */}
                  {item.commentReplies.map((i: any, index: number) => (
                    <div
                      key={index}
                      className="mt-5 flex gap-3 border-l-2 border-black/10 pl-3 text-black dark:border-white/10 dark:text-white sm:ml-8 sm:pl-5 md:ml-12"
                    >
                      <Image
                        src={
                          i.user.avatar
                            ? i.user.avatar.url
                            : defaultImage
                        }
                        width={50}
                        height={50}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-[45px] sm:w-[45px]"
                      />

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1">
                          <h5 className="break-words text-base font-semibold sm:text-lg">
                            {i.user.name}
                          </h5>

                          {i.user.role === "admin" && (
                            <VscVerifiedFilled className="text-[#0095f6] text-lg sm:text-xl" />
                          )}
                        </div>

                        <p className="mt-1 break-words text-sm leading-6 text-black/75 dark:text-white/75 sm:text-base">
                          {i.comment}
                        </p>

                        <small className="mt-1 block text-xs text-black/45 dark:text-white/45">
                          {format(i.createdAt)}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setAnswerId,
  questionId,
  answerCreationLoading,
  setQuestionId,
  replyActive,
  setReplyActive,
}: any) => {
  return (
    <div className="my-3 w-full">
      {data[activeVideo].questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVide={activeVideo}
          item={item}
          index={index}
          answer={answer}
          setAnswer={setAnswer}
          questionId={questionId}
          setQuestionId={setQuestionId}
          answerCreationLoading={answerCreationLoading}
          handleAnswerSubmit={handleAnswerSubmit}
          replyActive={replyActive}
          setReplyActive={setReplyActive}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  answer,
  setAnswer,
  questionId,
  setQuestionId,
  answerCreationLoading,
  handleAnswerSubmit,
  replyActive,
  setReplyActive,
}: any) => {
  return (
    <div className="my-5 rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5">
      {/* Question */}
      <div className="flex items-start gap-3">
        <Image
          src={item.user.avatar ? item.user.avatar.url : defaultImage}
          width={50}
          height={50}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-[50px] sm:w-[50px]"
        />

        <div className="min-w-0 flex-1 text-black dark:text-white">
          <h5 className="break-words text-base font-semibold sm:text-lg md:text-[20px]">
            {item.user.name}
          </h5>

          <p className="mt-1 break-words text-sm leading-6 sm:text-base">
            {item.question}
          </p>

          <small className="mt-1 block text-xs text-black/50 dark:text-white/50">
            {!item.createdAt ? "" : format(item.createdAt)}
          </small>
        </div>
      </div>

      {/* Reply Controls */}
      <div className="mt-3 flex items-center gap-2 pl-12 sm:pl-[66px]">
        <button
          type="button"
          className="text-sm text-black/60 transition-colors hover:text-red-500 dark:text-white/60"
          onClick={() => {
            setReplyActive(!replyActive);
            setQuestionId(item._id);
          }}
        >
          {!replyActive
            ? item.questionReplies.length !== 0
              ? "All Replies"
              : "Add Reply"
            : "Hide Replies"}
        </button>

        <BiMessage
          size={18}
          className="cursor-pointer text-black/50 dark:text-white/50"
        />

        <span className="text-sm text-black/50 dark:text-white/50">
          {item.questionReplies.length}
        </span>
      </div>

      {/* Question Replies */}
      {replyActive && questionId === item._id && (
        <div className="mt-4">
          {item.questionReplies.map((replyItem: any) => (
            <div
              key={replyItem._id}
              className="mb-5 flex gap-3 border-l-2 border-black/10 pl-3 text-black dark:border-white/10 dark:text-white sm:ml-8 sm:pl-5 md:ml-12"
            >
              <Image
                src={
                  replyItem.user.avatar
                    ? replyItem.user.avatar.url
                    : defaultImage
                }
                width={50}
                height={50}
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-[45px] sm:w-[45px]"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1">
                  <h5 className="break-words text-base font-semibold sm:text-lg">
                    {replyItem.user.name}
                  </h5>

                  {replyItem.user.role === "admin" && (
                    <VscVerifiedFilled className="text-[#0095f6] text-lg sm:text-xl" />
                  )}
                </div>

                <p className="mt-1 break-words text-sm leading-6 text-black/75 dark:text-white/75 sm:text-base">
                  {replyItem.answer}
                </p>

                <small className="mt-1 block text-xs text-black/45 dark:text-white/45">
                  {format(replyItem.createdAt)}
                </small>
              </div>
            </div>
          ))}

          {/* Answer Input */}
          <div className="relative mt-4 flex w-full sm:ml-8 sm:w-[calc(100%-32px)] md:ml-12 md:w-[calc(100%-48px)]">
            <input
              placeholder="Enter your answer..."
              value={answer}
              onChange={(e: any) => setAnswer(e.target.value)}
              className={`w-full rounded-lg border border-black/10 bg-transparent p-3 pr-20 text-sm text-black outline-none transition-all focus:border-red-500 dark:border-white/15 dark:text-white sm:text-base ${
                answer === "" || answerCreationLoading
                  ? "cursor-not-allowed"
                  : ""
              }`}
              type="text"
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-red-500 transition-colors hover:text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleAnswerSubmit}
              disabled={answer === "" || answerCreationLoading}
            >
              {answerCreationLoading ? "..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;


import { styles } from "@/app/styles/styles";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

import {
  AiOutlineDelete,
  AiOutlinePlayCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";

import { BiSolidBank, BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];

    updatedCollapsed[index] = !updatedCollapsed[index];

    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];

    updatedData[index].links.splice(linkIndex, 1);

    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];

    updatedData[index].links.push({
      title: "",
      url: "",
    });

    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].link === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].link === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const inputClass = `${styles.input} !mt-2 !h-[48px] !rounded-xl !border-black/10 !bg-black/[0.02] px-4 transition-all duration-200 focus:!border-[#37a39a] focus:!bg-white dark:!border-white/10 dark:!bg-white/[0.03] dark:focus:!bg-white/[0.05]`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-black/10 px-4 py-5 dark:border-white/10 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37a39a]">
          Step 03
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
          Course Content
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50 dark:text-white/50">
          Organize your lessons into sections and add videos, descriptions,
          and useful resources.
        </p>
      </div>

      <div className="px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            {courseContentData?.map((item: any, index: number) => {
              const showSectionInput =
                index === 0 ||
                item.videoSection !== courseContentData[index - 1].videoSection;

              return (
                <div key={index}>
                  {/* Section Header */}
                  {showSectionInput && (
                    <div className="mb-4 mt-3 flex flex-col gap-3 rounded-2xl border border-[#37a39a]/15 bg-[#37a39a]/[0.035] p-4 dark:border-[#37a39a]/15 dark:bg-[#37a39a]/[0.04] sm:flex-row sm:items-center sm:justify-between sm:p-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#37a39a]/10 text-[#37a39a]">
                          <AiOutlinePlayCircle className="text-[22px]" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#37a39a]">
                            Section
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <input
                              type="text"
                              className={`min-w-0 max-w-full flex-1 cursor-pointer bg-transparent text-base font-semibold text-black outline-none dark:text-white sm:text-lg ${
                                item.videoSection === "Untitled Section"
                                  ? "w-[180px]"
                                  : "w-full"
                              }`}
                              value={item.videoSection}
                              onChange={(e) => {
                                const updateData = [...courseContentData];

                                updateData[index] = {
                                  ...updateData[index],
                                  videoSection: e.target.value,
                                };

                                setCourseContentData(updateData);
                              }}
                            />

                            <BiSolidPencil className="shrink-0 cursor-pointer text-black/50 dark:text-white/50" />
                          </div>
                        </div>
                      </div>

                      <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-black/50 shadow-sm dark:bg-white/[0.05] dark:text-white/50">
                        Lesson {index + 1}
                      </span>
                    </div>
                  )}

                  {/* Lesson Card */}
                  <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-[#111827]">
                    {/* Lesson Header */}
                    <div className="flex min-w-0 items-center justify-between gap-3 border-b border-black/10 px-4 py-4 dark:border-white/10 sm:px-5">
                      <div className="min-w-0 flex-1">
                        {isCollapsed[index] ? (
                          item.title ? (
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#37a39a]/10 text-xs font-bold text-[#37a39a]">
                                {index + 1}
                              </div>

                              <p className="truncate text-sm font-semibold text-black dark:text-white sm:text-base">
                                {item.title}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-black/40 dark:text-white/40">
                              Untitled lesson
                            </p>
                          )
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#37a39a]/10 text-xs font-bold text-[#37a39a]">
                              {index + 1}
                            </div>

                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider text-black/35 dark:text-white/35">
                                Lesson
                              </p>

                              <p className="text-sm font-semibold text-black dark:text-white">
                                Content Details
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                            index > 0
                              ? "text-red-500 hover:bg-red-500/10"
                              : "cursor-not-allowed text-black/20 dark:text-white/20"
                          }`}
                          onClick={() => {
                            if (index > 0) {
                              const updatedData = [...courseContentData];

                              updatedData.splice(index, 1);

                              setCourseContentData(updatedData);
                            }
                          }}
                        >
                          <AiOutlineDelete className="text-[19px]" />
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-black/50 transition-all hover:bg-black/[0.05] dark:text-white/50 dark:hover:bg-white/[0.05]"
                          onClick={() => handleCollapseToggle(index)}
                        >
                          <MdOutlineKeyboardArrowDown
                            className={`text-[24px] transition-transform duration-200 ${
                              isCollapsed[index] ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Lesson Form */}
                    {!isCollapsed[index] && (
                      <div className="space-y-5 p-4 sm:p-5 lg:p-6">
                        {/* Video Information */}
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                          <div>
                            <label className={styles.label}>
                              Video Title
                            </label>

                            <input
                              type="text"
                              placeholder="Project Plan..."
                              className={inputClass}
                              value={item.title}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];

                                updatedData[index] = {
                                  ...updatedData[index],
                                  title: e.target.value,
                                };

                                setCourseContentData(updatedData);
                              }}
                            />
                          </div>

                          <div>
                            <label className={styles.label}>Video URL</label>

                            <input
                              type="text"
                              placeholder="https://"
                              className={inputClass}
                              value={item.videoUrl}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];

                                updatedData[index] = {
                                  ...updatedData[index],
                                  videoUrl: e.target.value,
                                };

                                setCourseContentData(updatedData);
                              }}
                            />
                          </div>

                          <div>
                            <label className={styles.label}>
                              Video Length (in minutes)
                            </label>

                            <input
                              type="number"
                              placeholder="20"
                              className={inputClass}
                              value={item.videoLength}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];

                                updatedData[index] = {
                                  ...updatedData[index],
                                  videoLength: e.target.value,
                                };

                                setCourseContentData(updatedData);
                              }}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <label className={styles.label}>
                            Video Description
                          </label>

                          <textarea
                            rows={7}
                            cols={30}
                            placeholder="Describe what students will learn in this lesson..."
                            className={`${styles.input} !mt-2 !min-h-[150px] !rounded-xl !border-black/10 !bg-black/[0.02] !py-3 px-4 focus:!border-[#37a39a] dark:!border-white/10 dark:!bg-white/[0.03]`}
                            value={item.description}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];

                              updatedData[index] = {
                                ...updatedData[index],
                                description: e.target.value,
                              };

                              setCourseContentData(updatedData);
                            }}
                          />
                        </div>

                        {/* Resources */}
                        <div className="rounded-xl border border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold text-black dark:text-white sm:text-base">
                                Lesson Resources
                              </h3>

                              <p className="mt-1 text-xs text-black/40 dark:text-white/40">
                                Add source code, documentation, or other
                                useful resources.
                              </p>
                            </div>

                            <BiSolidBank className="shrink-0 text-xl text-[#37a39a]" />
                          </div>

                          <div className="space-y-4">
                            {item?.links.map(
                              (link: any, linkIndex: number) => (
                                <div
                                  className="rounded-xl border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-[#111827] sm:p-4"
                                  key={linkIndex}
                                >
                                  <div className="mb-3 flex items-center justify-between">
                                    <label className={styles.label}>
                                      Link {linkIndex + 1}
                                    </label>

                                    <button
                                      type="button"
                                      disabled={linkIndex === 0}
                                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                        linkIndex === 0
                                          ? "cursor-not-allowed text-black/20 dark:text-white/20"
                                          : "text-red-500 hover:bg-red-500/10"
                                      }`}
                                      onClick={() => {
                                        if (linkIndex !== 0) {
                                          handleRemoveLink(
                                            index,
                                            linkIndex
                                          );
                                        }
                                      }}
                                    >
                                      <AiOutlineDelete className="text-[18px]" />
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                    <input
                                      type="text"
                                      placeholder="Source Code... (Link title)"
                                      className={inputClass}
                                      value={link.title}
                                      onChange={(e) => {
                                        const updatedData = [
                                          ...courseContentData,
                                        ];

                                        updatedData[index] = {
                                          ...updatedData[index],
                                          links: updatedData[index].links.map(
                                            (link: any, i: number) => {
                                              if (i === linkIndex) {
                                                return {
                                                  ...link,
                                                  title: e.target.value,
                                                };
                                              }

                                              return link;
                                            }
                                          ),
                                        };

                                        setCourseContentData(updatedData);
                                      }}
                                    />

                                    <input
                                      type="url"
                                      placeholder="https://example.com/resource"
                                      className={inputClass}
                                      value={link.url}
                                      onChange={(e) => {
                                        const updatedData = [
                                          ...courseContentData,
                                        ];

                                        updatedData[index] = {
                                          ...updatedData[index],
                                          links: updatedData[index].links.map(
                                            (link: any, i: number) => {
                                              if (i === linkIndex) {
                                                return {
                                                  ...link,
                                                  url: e.target.value,
                                                };
                                              }

                                              return link;
                                            }
                                          ),
                                        };

                                        setCourseContentData(updatedData);
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddLink(index)}
                            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-black transition-all hover:bg-black/[0.04] dark:border-white/10 dark:text-white dark:hover:bg-white/[0.05]"
                          >
                            <BiSolidBank className="text-[#37a39a]" />
                            Add Resource
                          </button>
                        </div>

                        {/* Add New Content */}
                        {index === courseContentData.length - 1 && (
                          <button
                            type="button"
                            onClick={() => newContentHandler(item)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#37a39a]/30 bg-[#37a39a]/[0.03] px-4 py-3.5 text-sm font-medium text-[#27877f] transition-all hover:border-[#37a39a]/60 hover:bg-[#37a39a]/[0.07] dark:text-[#55cfc4]"
                          >
                            <AiOutlinePlusCircle className="text-[20px]" />
                            Add New Content
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add New Section */}
          <button
            type="button"
            onClick={() => addNewSection()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/15 bg-black/[0.015] px-5 py-4 text-sm font-semibold text-black/60 transition-all hover:border-[#37a39a]/50 hover:bg-[#37a39a]/[0.04] hover:text-[#27877f] dark:border-white/15 dark:bg-white/[0.02] dark:text-white/60 dark:hover:border-[#37a39a]/50 dark:hover:text-[#55cfc4]"
          >
            <AiOutlinePlusCircle className="text-[21px]" />
            Add New Section
          </button>
        </form>

        {/* Navigation */}
        <div className="mt-8 flex w-full flex-col-reverse gap-3 border-t border-black/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={prevButton}
            className="h-11 w-full rounded-xl border border-black/10 bg-transparent px-8 text-sm font-medium text-black transition-all duration-200 hover:bg-black/[0.04] dark:border-white/10 dark:text-white dark:hover:bg-white/[0.05] sm:w-[160px]"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={handleOptions}
            className="h-11 w-full rounded-xl bg-[#37a39a] px-8 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#2f9189] hover:shadow-md active:scale-[0.98] sm:w-[180px]"
          >
            Preview Course →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;


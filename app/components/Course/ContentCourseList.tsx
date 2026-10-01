


import React, { useState } from "react";
import {
  BiSolidChevronDown,
  BiSolidChevronUp,
} from "react-icons/bi";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const ContentCourseList = (props: Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // Find unique video sections
  const videoSections: string[] = [];

  props.data?.forEach((item: any) => {
    if (
      item.videoSection &&
      !videoSections.includes(item.videoSection)
    ) {
      videoSections.push(item.videoSection);
    }
  });

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);

    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }

    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-4 w-full ${
        !props.isDemo
          ? "sticky top-24 left-0 z-30 ml-0 lg:ml-[30px]"
          : ""
      }`}
    >
      <div className="w-full space-y-3">
        {videoSections.map(
          (section: string, sectionIndex: number) => {
            const isSectionVisible =
              visibleSections.has(section);

            // Filter videos by section
            const sectionVideos: any[] = props.data.filter(
              (item: any) =>
                item.videoSection === section
            );

            const sectionVideoCount: number =
              sectionVideos.length;

            const sectionVideoLength: number =
              sectionVideos.reduce(
                (
                  totalLength: number,
                  item: any
                ) => totalLength + item.videoLength,
                0
              );

            const sectionStartIndex: number =
              totalCount;

            totalCount += sectionVideoCount;

            const sectionContentHours =
              sectionVideoLength / 60;

            return (
              <div
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isSectionVisible
                    ? "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-transparent dark:hover:border-gray-700"
                }`}
                key={section}
              >
                {/* Section Header */}
                <div className="w-full">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-inset sm:px-5"
                    onClick={() =>
                      toggleSection(section)
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <h2 className="break-words text-base font-semibold leading-6 text-black dark:text-white sm:text-lg">
                        {section}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                        {sectionVideoCount} Lesson
                        {sectionVideoCount !== 1
                          ? "s"
                          : ""}{" "}
                        ·{" "}
                        {sectionVideoLength < 60
                          ? sectionVideoLength
                          : sectionContentHours.toFixed(
                              2
                            )}{" "}
                        {sectionVideoLength > 60
                          ? "hours"
                          : "minutes"}
                      </p>
                    </div>

                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isSectionVisible
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {isSectionVisible ? (
                        <BiSolidChevronUp size={18} />
                      ) : (
                        <BiSolidChevronDown size={18} />
                      )}
                    </span>
                  </button>
                </div>

                {/* Lessons */}
                {isSectionVisible && (
                  <div className="border-t border-gray-200 dark:border-gray-800">
                    {sectionVideos.map(
                      (
                        item: any,
                        index: number
                      ) => {
                        const videoIndex: number =
                          sectionStartIndex + index;

                        const contentLength =
                          item.videoLength / 60;

                        const isActive =
                          videoIndex ===
                          props.activeVideo;

                        return (
                          <div
                            className={`group w-full cursor-pointer border-b border-gray-100 p-4 last:border-b-0 dark:border-gray-800 ${
                              isActive
                                ? "bg-gray-100 dark:bg-gray-800"
                                : "hover:bg-gray-50 dark:hover:bg-gray-900"
                            } transition-colors duration-200`}
                            key={item._id}
                            onClick={() =>
                              props.isDemo
                                ? null
                                : props?.setActiveVideo(
                                    videoIndex
                                  )
                            }
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                                  isActive
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                }`}
                              >
                                <MdOutlineOndemandVideo
                                  size={18}
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <h3
                                  className={`break-words text-sm font-medium leading-6 sm:text-base ${
                                    isActive
                                      ? "text-black dark:text-white"
                                      : "text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {item.title}
                                </h3>

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500 sm:text-sm">
                                  {item.videoLength >
                                  60
                                    ? contentLength.toFixed(
                                        2
                                      )
                                    : item.videoLength}{" "}
                                  {item.videoLength >
                                  60
                                    ? "hours"
                                    : "minutes"}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ContentCourseList;


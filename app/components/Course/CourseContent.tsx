

"use client";

import { useGetCourseContentQuery } from "@/redux/features/courses/courseApi";
import React, { useState } from "react";
import Loader from "../Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import ContentCourseList from "./ContentCourseList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />

          <div className="min-h-screen w-full">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />

            <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 lg:grid-cols-10">
              {/* Main Lesson Content */}
              <div className="min-w-0 lg:col-span-7">
                <CourseContentMedia
                  data={data}
                  id={id}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                  user={user}
                  refetch={refetch}
                />
              </div>

              {/* Course Content / Playlist */}
              <aside className="w-full border-t border-black/10 dark:border-white/10 lg:col-span-3 lg:border-t-0 lg:border-l lg:border-black/10 lg:dark:border-white/10">
                <div className="w-full px-3 py-4 sm:px-5 lg:sticky lg:top-24 lg:px-4 xl:px-6">
                  <ContentCourseList
                    setActiveVideo={setActiveVideo}
                    data={data}
                    activeVideo={activeVideo}
                  />
                </div>
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;

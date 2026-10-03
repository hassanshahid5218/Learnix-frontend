"use client";

import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { use, useEffect } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};


const Page = ({ params }: Props) => {
  const { id } = use(params);

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (error) {
      redirect("/");
      return;
    }

    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item.courseId === id
      );

      if (!isPurchased) {
        redirect("/");
      }
    }
  }, [data, error, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.user) {
    return null;
  }

  return (
    <div>
      <CourseContent id={id} user={data.user} />
    </div>
  );
};

export default Page;
import CourseDetailsPage from "@/app/components/Course/CourseDetailPage";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

//   console.log("id:", id);

  return <CourseDetailsPage id={id} />;
};

export default Page;
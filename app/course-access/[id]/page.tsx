// "use client";
// import CourseContent from "@/app/components/Course/CourseContent";
// import Loader from "@/app/components/Loader";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { redirect } from "next/navigation";
// import React, { use, useEffect } from "react";

// type Props = {
//   params: Promise<{
//     id: string;
//   }>;
// };
// const Page = ({ params }: Props) => {
//   const { id } = use(params);

//   const { isLoading, error, data } = useLoadUserQuery(undefined, {});

//   useEffect(() => {
//     if (error) {
//       redirect("/");
//       return;
//     }

//     if (data) {
//       const isPurchased = data.user.courses.find(
//         (item: any) => item.courseId === id
//       );

//       if (!isPurchased) {
//         redirect("/");
//       }
//     }
//   }, [data, error, id]);

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (!data?.user) {
//     return null;
//   }

//   return (
//     <div>
//       <CourseContent id={id} user={data.user} />
//     </div>
//   );
// };

// export default Page;


"use client";

import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = ({ params }: Props) => {
  const { id } = use(params);

  const router = useRouter();

  const {
    isLoading,
    error,
    data,
  } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    // Still loading user data
    if (isLoading) {
      return;
    }

    // User is not logged in / API error
    if (error || !data?.user) {
      router.push("/");
      return;
    }

    // Check whether the user has purchased this course
    const isPurchased = data.user.courses?.some(
      (item: any) =>
        item?.courseId?.toString() === id?.toString()
    );

    // User has not purchased this course
    if (!isPurchased) {
      router.push("/");
    }
  }, [data, error, id, isLoading, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data?.user) {
    return <Loader />;
  }

  const isPurchased = data.user.courses?.some(
    (item: any) =>
      item?.courseId?.toString() === id?.toString()
  );

  if (!isPurchased) {
    return <Loader />;
  }

  return (
    <div>
      <CourseContent
        id={id}
        user={data.user}
      />
    </div>
  );
};

export default Page;


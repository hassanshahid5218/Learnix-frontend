
import { styles } from "@/app/styles/styles";
import React, { FC, useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const { data } = useGetHeroDataQuery("Categories", {});

  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({
            ...courseInfo,
            thumbnail: reader.result,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({
          ...courseInfo,
          thumbnail: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const inputClass = `${styles.input} !mt-2 !h-[48px] !rounded-xl !border-black/10 !bg-black/[0.02] px-4 transition-all duration-200 focus:!border-[#37a39a] focus:!bg-white dark:!border-white/10 dark:!bg-white/[0.03] dark:focus:!bg-white/[0.05]`;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="border-b border-black/10 px-4 py-5 dark:border-white/10 sm:px-6 sm:py-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37a39a]">
              Step 01
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
              Course Information
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50 dark:text-white/50">
              Add the basic information students will see before enrolling in
              your course.
            </p>
          </div>
        </div>

        <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Basic Information */}
          <section>
            <div className="mb-5">
              <h2 className="text-base font-semibold text-black dark:text-white">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-black/45 dark:text-white/45">
                Give your course a clear name and description.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className={styles.label}>
                  Course Name
                </label>

                <input
                  type="name"
                  name=""
                  required
                  value={courseInfo.name}
                  onChange={(e: any) => {
                    setCourseInfo({
                      ...courseInfo,
                      name: e.target.value,
                    });
                  }}
                  id="name"
                  placeholder="MERN stack Learnix platform with next 13"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="description" className={styles.label}>
                  Course Description
                </label>

                <textarea
                  name=""
                  id="description"
                  cols={30}
                  rows={7}
                  placeholder="Write something amazing..."
                  className={`${styles.input} !mt-2 !min-h-[150px] !rounded-xl !border-black/10 !bg-black/[0.02] !py-3 px-4 transition-all duration-200 focus:!border-[#37a39a] focus:!bg-white dark:!border-white/10 dark:!bg-white/[0.03] dark:focus:!bg-white/[0.05]`}
                  value={courseInfo.description}
                  onChange={(e: any) =>
                    setCourseInfo({
                      ...courseInfo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="border-t border-black/10 pt-7 dark:border-white/10">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-black dark:text-white">
                Pricing
              </h2>

              <p className="mt-1 text-sm text-black/45 dark:text-white/45">
                Set the current price and optional original price.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="price" className={styles.label}>
                  Course Price
                </label>

                <input
                  type="number"
                  name=""
                  required
                  value={courseInfo.price}
                  onChange={(e: any) => {
                    setCourseInfo({
                      ...courseInfo,
                      price: e.target.value,
                    });
                  }}
                  id="price"
                  placeholder="29"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="estimatedPrice" className={styles.label}>
                  Estimated Price (optional)
                </label>

                <input
                  type="number"
                  name=""
                  required
                  value={courseInfo.estimatedPrice}
                  onChange={(e: any) => {
                    setCourseInfo({
                      ...courseInfo,
                      estimatedPrice: e.target.value,
                    });
                  }}
                  id="estimatedPrice"
                  placeholder="79"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Classification */}
          <section className="border-t border-black/10 pt-7 dark:border-white/10">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-black dark:text-white">
                Course Classification
              </h2>

              <p className="mt-1 text-sm text-black/45 dark:text-white/45">
                Help students understand what the course covers and who it is
                for.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="tags" className={styles.label}>
                  Course Tags
                </label>

                <input
                  type="text"
                  name=""
                  required
                  value={courseInfo.tags}
                  onChange={(e: any) => {
                    setCourseInfo({
                      ...courseInfo,
                      tags: e.target.value,
                    });
                  }}
                  id="tags"
                  placeholder="MERN, Next 13, Socket io, Tailwind css, Learnix"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="categories" className={styles.label}>
                  Course Categories
                </label>

                <select
                  name=""
                  id="categories"
                  className={`${inputClass} cursor-pointer`}
                  value={courseInfo.categories}
                  onChange={(e: any) => {
                    setCourseInfo({
                      ...courseInfo,
                      categories: e.target.value,
                    });
                  }}
                >
                  <option value="" className="dark:bg-[#111C43]">
                    Select Category
                  </option>

                  {categories.map((item: any) => (
                    <option
                      value={item._id}
                      key={item._id}
                      className="dark:bg-[#111C43]"
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="level" className={styles.label}>
                  Course Level
                </label>

                <input
                  type="text"
                  name=""
                  required
                  value={courseInfo.level}
                  onChange={(e: any) => {
                    setCourseInfo({
                      ...courseInfo,
                      level: e.target.value,
                    });
                  }}
                  id="level"
                  placeholder="Beginner/Intermediate/Expert"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="demoUrl" className={styles.label}>
                  Demo URL
                </label>

                <input
                  type="text"
                  name=""
                  required
                  value={courseInfo.demoUrl}
                  onChange={(e: any) => {
                    setCourseInfo({
                      ...courseInfo,
                      demoUrl: e.target.value,
                    });
                  }}
                  id="demoUrl"
                  placeholder="http://"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Thumbnail */}
          <section className="border-t border-black/10 pt-7 dark:border-white/10">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-black dark:text-white">
                Course Thumbnail
              </h2>

              <p className="mt-1 text-sm text-black/45 dark:text-white/45">
                Upload a high-quality image that represents your course.
              </p>
            </div>

            <div className="w-full">
              <input
                type="file"
                accept="iamge/*"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />

              <label
                htmlFor="file"
                className={`group relative flex min-h-[220px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-3 transition-all duration-200 sm:min-h-[280px] ${
                  dragging
                    ? "border-[#37a39a] bg-[#37a39a]/10"
                    : "border-black/10 bg-black/[0.02] hover:border-[#37a39a]/60 hover:bg-[#37a39a]/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-[#37a39a]/60 dark:hover:bg-[#37a39a]/[0.03]"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {courseInfo.thumbnail ? (
                  <>
                    <img
                      src={courseInfo.thumbnail}
                      alt="Course thumbnail preview"
                      className="h-full max-h-[320px] w-full rounded-xl object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
                      <p className="text-sm font-medium text-white">
                        Click to replace thumbnail
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex max-w-md flex-col items-center px-5 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#37a39a]/10">
                      <svg
                        className="h-7 w-7 text-[#37a39a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M12 3v12m0-12l-4 4m4-4l4 4"
                        />
                      </svg>
                    </div>

                    <p className="text-sm font-semibold text-black dark:text-white sm:text-base">
                      Drag and drop your thumbnail here
                    </p>

                    <p className="mt-1 text-xs leading-5 text-black/45 dark:text-white/45 sm:text-sm">
                      or click to browse from your device
                    </p>
                  </div>
                )}
              </label>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex w-full justify-end border-t border-black/10 pt-6 dark:border-white/10">
            <input
              type="submit"
              value="Next"
              className="h-11 w-full cursor-pointer rounded-xl bg-[#37a39a] px-8 text-center font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#2f9189] hover:shadow-md active:scale-[0.98] sm:w-[180px]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;


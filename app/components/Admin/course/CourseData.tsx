
import { styles } from "@/app/styles/styles";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { MdAddCircleOutline } from "react-icons/md";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];

    updatedBenefits[index] = {
      ...updatedBenefits[index],
      title: value,
    };

    setBenefits(updatedBenefits);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];

    updatedPrerequisites[index] = {
      ...updatedPrerequisites[index],
      title: value,
    };

    setPrerequisites(updatedPrerequisites);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  const inputClass = `${styles.input} !mt-2 !h-[50px] !rounded-xl !border-black/10 !bg-black/[0.02] px-4 transition-all duration-200 focus:!border-[#37a39a] focus:!bg-white dark:!border-white/10 dark:!bg-white/[0.03] dark:focus:!bg-white/[0.05]`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-black/10 px-4 py-5 dark:border-white/10 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37a39a]">
          Step 02
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black dark:text-white sm:text-3xl">
          Course Options
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/50 dark:text-white/50">
          Tell students what they will gain from this course and what
          knowledge they should have before starting.
        </p>
      </div>

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Benefits */}
        <section className="rounded-2xl border border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5 lg:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#37a39a]/10">
              <span className="text-lg font-bold text-[#37a39a]">01</span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white sm:text-lg">
                What will students learn?
              </h2>

              <p className="mt-1 text-sm leading-5 text-black/45 dark:text-white/45">
                Add the key skills, outcomes, or benefits students will get
                after completing the course.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {benefits.map((benefit: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-semibold text-black/40 shadow-sm dark:bg-white/[0.05] dark:text-white/40">
                  {index + 1}
                </div>

                <input
                  type="text"
                  name="benefits"
                  placeholder="You will be able to build a full stack Learnix Platform"
                  required
                  className={`${inputClass} flex-1`}
                  value={benefit.title}
                  onChange={(e) =>
                    handleBenefitChange(index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddBenefits}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#37a39a]/20 bg-[#37a39a]/5 px-4 py-2.5 text-sm font-medium text-[#27877f] transition-all duration-200 hover:border-[#37a39a]/40 hover:bg-[#37a39a]/10 dark:text-[#55cfc4]"
          >
            <MdAddCircleOutline className="text-[21px]" />
            Add Benefit
          </button>
        </section>

        {/* Prerequisites */}
        <section className="rounded-2xl border border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.02] sm:p-5 lg:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#37a39a]/10">
              <span className="text-lg font-bold text-[#37a39a]">02</span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-black dark:text-white sm:text-lg">
                What should students know first?
              </h2>

              <p className="mt-1 text-sm leading-5 text-black/45 dark:text-white/45">
                Add the skills or knowledge students should have before
                beginning this course.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {prerequisites.map((prerequisite: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-semibold text-black/40 shadow-sm dark:bg-white/[0.05] dark:text-white/40">
                  {index + 1}
                </div>

                <input
                  type="text"
                  name="prerequisites"
                  placeholder="You need basic knowledge of MERN stack"
                  required
                  className={`${inputClass} flex-1`}
                  value={prerequisite.title}
                  onChange={(e) =>
                    handlePrerequisiteChange(index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddPrerequisites}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#37a39a]/20 bg-[#37a39a]/5 px-4 py-2.5 text-sm font-medium text-[#27877f] transition-all duration-200 hover:border-[#37a39a]/40 hover:bg-[#37a39a]/10 dark:text-[#55cfc4]"
          >
            <MdAddCircleOutline className="text-[21px]" />
            Add Prerequisite
          </button>
        </section>

        {/* Navigation */}
        <div className="flex w-full flex-col-reverse gap-3 border-t border-black/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
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
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseData;


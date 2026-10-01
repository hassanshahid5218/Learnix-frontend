
import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Coure Preview",
  ];

  return (
    <div className="w-full">
      <div className="space-y-0">
        {options.map((option: string, index: number) => {
          const completed = active + 1 > index;
          const current = active === index;
          const lastItem = index === options.length - 1;

          return (
            <div key={index} className="relative flex min-h-[78px]">
              {/* Connector */}
              {!lastItem && (
                <div
                  className={`absolute left-[17px] top-[40px] h-[48px] w-[2px] transition-colors duration-300 ${
                    completed ? "bg-[#37a39a]" : "bg-black/10 dark:bg-white/10"
                  }`}
                />
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  completed
                    ? "border-[#37a39a] bg-[#37a39a] text-white shadow-[0_0_0_5px_rgba(55,163,154,0.10)]"
                    : "border-black/10 bg-black/[0.03] text-black/35 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/35"
                } ${
                  current
                    ? "ring-2 ring-[#37a39a]/20"
                    : ""
                }`}
              >
                {completed ? (
                  <IoMdCheckmark className="text-[21px]" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Step Text */}
              <div className="min-w-0 pl-4 pt-[2px]">
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    current
                      ? "text-[#37a39a]"
                      : "text-black/35 dark:text-white/35"
                  }`}
                >
                  Step {String(index + 1).padStart(2, "0")}
                </p>

                <h5
                  className={`mt-1 text-sm font-semibold leading-5 transition-colors duration-200 sm:text-[15px] ${
                    current
                      ? "text-black dark:text-white"
                      : completed
                      ? "text-black/70 dark:text-white/70"
                      : "text-black/40 dark:text-white/40"
                  }`}
                >
                  {option}
                </h5>

                {current && (
                  <p className="mt-1 text-xs text-black/40 dark:text-white/40">
                    Current step
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseOptions;


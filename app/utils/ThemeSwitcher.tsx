

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative flex h-9 w-[68px] items-center rounded-full
        border p-1
        transition-all duration-500 ease-in-out
        focus:outline-none
        ${
          isDark
            ? "border-indigo-400/20 bg-[#111936] shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            : "border-indigo-200 bg-[#eef2ff] shadow-[0_0_20px_rgba(99,102,241,0.10)]"
        }
      `}
    >
      {/* Sliding circle */}
      <span
        className={`
          absolute top-1 flex h-7 w-7 items-center justify-center
          rounded-full
          transition-all duration-500 ease-in-out
          ${
            isDark
              ? "translate-x-[30px] bg-[#1e293b] shadow-[0_0_12px_rgba(129,140,248,0.35)]"
              : "translate-x-0 bg-white shadow-[0_0_12px_rgba(99,102,241,0.20)]"
          }
        `}
      >
        {isDark ? (
          <BiMoon
            size={17}
            className="text-indigo-300 transition-transform duration-500"
          />
        ) : (
          <BiSun
            size={18}
            className="text-indigo-500 transition-transform duration-500"
          />
        )}
      </span>

      {/* Background icons */}
      <span
        className={`
          absolute left-2 text-indigo-500/50
          transition-opacity duration-300
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
      >
        <BiSun size={14} />
      </span>

      <span
        className={`
          absolute right-2 text-indigo-300/50
          transition-opacity duration-300
          ${isDark ? "opacity-0" : "opacity-100"}
        `}
      >
        <BiMoon size={14} />
      </span>
    </button>
  );
};


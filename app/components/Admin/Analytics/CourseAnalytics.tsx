

"use client";

import React from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useTheme as useNextTheme } from "next-themes";

import Loader from "../../Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/styles";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError } =
    useGetCoursesAnalyticsQuery({});

  const { resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";

  const axisTextColor = isDark ? "#cbd5e1" : "#475569";
  const axisLineColor = isDark ? "#475569" : "#94a3b8";
  const gridColor = isDark ? "#263449" : "#cbd5e1";

  const tooltipBackground = isDark ? "#111827" : "#ffffff";
  const tooltipBorder = isDark ? "#334155" : "#e2e8f0";
  const tooltipText = isDark ? "#f8fafc" : "#0f172a";

  const labelColor = isDark ? "#e2e8f0" : "#334155";

  const analyticsData: any[] = [];

  data?.courses?.last12Months?.forEach((item: any) => {
    analyticsData.push({
      name: item.month,
      uv: item.count,
    });
  });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-full">
          {/* =========================
              HEADER
          ========================== */}

          <div className="px-1 pb-4 pt-6 sm:px-2 sm:pt-8 lg:pt-10">
            <h1 className={`${styles.title} !text-start`}>
              Courses Analytics
            </h1>

            <p className={`${styles.label} mt-1`}>
              Last 12 months analytics data
            </p>
          </div>

          {/* =========================
              CHART CONTAINER
          ========================== */}

          <div className="flex min-h-[500px] w-full items-center justify-center rounded-2xl border border-black/10 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60 sm:min-h-[550px] sm:p-5 lg:min-h-[600px] lg:p-8">
            {analyticsData.length === 0 ? (
              <div className="flex min-h-[300px] w-full items-center justify-center rounded-xl border border-dashed border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
                <p className="text-sm text-black/50 dark:text-white/50">
                  No course analytics data available.
                </p>
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height={500}
              >
                <BarChart
                  data={analyticsData}
                  margin={{
                    top: 35,
                    right: 15,
                    left: 5,
                    bottom: 25,
                  }}
                >
                  {/* =========================
                      GRID
                  ========================== */}

                  <CartesianGrid
                    stroke={gridColor}
                    strokeOpacity={isDark ? 0.7 : 0.8}
                    strokeDasharray="4 5"
                    vertical={true}
                    horizontal={true}
                  />

                  {/* =========================
                      X AXIS
                  ========================== */}

                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: axisTextColor,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                    tickLine={{
                      stroke: axisLineColor,
                      strokeOpacity: 0.6,
                    }}
                    axisLine={{
                      stroke: axisLineColor,
                      strokeOpacity: 0.7,
                    }}
                    tickMargin={8}
                  >
                    <Label
                      value=""
                      offset={0}
                      position="insideBottom"
                      fill={axisTextColor}
                    />
                  </XAxis>

                  {/* =========================
                      Y AXIS
                  ========================== */}

                  <YAxis
                    domain={[minValue, "auto"]}
                    allowDecimals={false}
                    tick={{
                      fill: axisTextColor,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                    tickLine={{
                      stroke: axisLineColor,
                      strokeOpacity: 0.6,
                    }}
                    axisLine={{
                      stroke: axisLineColor,
                      strokeOpacity: 0.7,
                    }}
                    tickMargin={8}
                  />

                  {/* =========================
                      TOOLTIP
                  ========================== */}

                  <Tooltip
                    cursor={{
                      fill: isDark
                        ? "#475569"
                        : "#94a3b8",
                      opacity: isDark ? 0.12 : 0.08,
                    }}
                    contentStyle={{
                      backgroundColor: tooltipBackground,
                      border: `1px solid ${tooltipBorder}`,
                      borderRadius: "12px",
                      color: tooltipText,
                      boxShadow: isDark
                        ? "0 12px 30px rgba(0,0,0,0.35)"
                        : "0 12px 30px rgba(15,23,42,0.12)",
                    }}
                    labelStyle={{
                      color: tooltipText,
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}
                    itemStyle={{
                      color: isDark
                        ? "#86efac"
                        : "#3faf82",
                      fontWeight: 600,
                    }}
                  />

                  {/* =========================
                      BARS
                  ========================== */}

                  <Bar
                    dataKey="uv"
                    fill="#3faf82"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={55}
                  >
                    <LabelList
                      dataKey="uv"
                      position="top"
                      fill={labelColor}
                      fontSize={12}
                      fontWeight={600}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;


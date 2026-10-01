

"use client";

import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import { useTheme as useNextTheme } from "next-themes";

import Loader from "../../Loader";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/styles";

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const { resolvedTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";

  const axisTextColor = isDark ? "#cbd5e1" : "#475569";
  const axisLineColor = isDark ? "#475569" : "#94a3b8";
  const gridColor = isDark ? "#263449" : "#cbd5e1";

  const tooltipBackground = isDark ? "#111827" : "#ffffff";
  const tooltipBorder = isDark ? "#334155" : "#e2e8f0";
  const tooltipText = isDark ? "#f8fafc" : "#0f172a";

  const analyticsData =
    data?.orders?.last12Months?.map((item: any) => ({
      name: item.month,
      Count: item.count,
    })) || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={
            isDashboard
              ? "h-[30vh] min-h-[280px]"
              : "min-h-screen"
          }
        >
          {/* =========================
              HEADER
          ========================== */}

          <div
            className={
              isDashboard
                ? "mb-2 mt-0 pl-0 sm:pl-5"
                : "px-4 pb-4 pt-6 sm:px-6 lg:px-8"
            }
          >
            <h1
              className={`${styles.title} ${
                isDashboard ? "!text-[20px]" : ""
              } !text-start`}
            >
              Orders Analytics
            </h1>

            {!isDashboard && (
              <p className={`${styles.label} mt-1`}>
                Last 12 months analytics data
              </p>
            )}
          </div>

          {/* =========================
              CHART
          ========================== */}

          <div
            className={`w-full ${
              !isDashboard
                ? "h-[calc(100vh-150px)] min-h-[500px]"
                : "h-[calc(30vh-45px)] min-h-[230px]"
            } flex items-center justify-center px-2 sm:px-4`}
          >
            {analyticsData.length === 0 ? (
              <div className="flex h-full min-h-[250px] w-full items-center justify-center rounded-2xl border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
                <p className="text-sm text-black/50 dark:text-white/50">
                  No order analytics data available.
                </p>
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={analyticsData}
                  margin={{
                    top: 10,
                    right: 15,
                    left: 5,
                    bottom: isDashboard ? 10 : 25,
                  }}
                >
                  <CartesianGrid
                    stroke={gridColor}
                    strokeOpacity={isDark ? 0.7 : 0.8}
                    strokeDasharray="4 5"
                    vertical={true}
                    horizontal={true}
                  />

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
                  />

                  <YAxis
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

                  <Tooltip
                    cursor={{
                      stroke: isDark
                        ? "#475569"
                        : "#94a3b8",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
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
                        ? "#a5b4fc"
                        : "#4d62d9",
                      fontWeight: 600,
                    }}
                  />

                  {!isDashboard && (
                    <Legend
                      wrapperStyle={{
                        color: axisTextColor,
                        paddingTop: "12px",
                      }}
                    />
                  )}

                  <Line
                    type="monotone"
                    dataKey="Count"
                    stroke="#4d62d9"
                    strokeWidth={2.5}
                    dot={{
                      r: 3.5,
                      fill: isDark
                        ? "#111827"
                        : "#ffffff",
                      stroke: "#4d62d9",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 5.5,
                      fill: "#4d62d9",
                      stroke: isDark
                        ? "#111827"
                        : "#ffffff",
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;


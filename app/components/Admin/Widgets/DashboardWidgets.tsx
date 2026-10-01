

import React, { FC, useEffect, useState } from "react";

import UserAnalytics from "../Analytics/UsersAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";

import {
  useGetOrdersAnalyticsQuery,
  useGetUserAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{
          zIndex: open ? -1 : 1,
        }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [orderComparePrecentenge, setOrderComparePercentenge] =
    useState<any>();

  const [userComparePrecentenge, setUserComparePercentenge] =
    useState<any>();

  const { data, isLoading } = useGetUserAnalyticsQuery({});

  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths =
          data.users.last12Months.slice(-2);

        const ordersLastTwoMonths =
          ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth =
            usersLastTwoMonths[1].count;

          const usersPreviousMonth =
            usersLastTwoMonths[0].count;

          const ordersCurrentMonth =
            ordersLastTwoMonths[1].count;

          const ordersPreviousMonth =
            ordersLastTwoMonths[0].count;

          const usersPercentChange =
            ((usersCurrentMonth - usersPreviousMonth) /
              (usersPreviousMonth === 0
                ? 1
                : usersPreviousMonth)) *
            100;

          const ordersPercentChange =
            ((ordersCurrentMonth - ordersPreviousMonth) /
              (ordersPreviousMonth === 0
                ? 1
                : ordersPreviousMonth)) *
            100;

          setUserComparePercentenge({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrderComparePercentenge({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-6 min-h-screen w-full min-w-0 overflow-hidden px-3 pb-8 sm:mt-8 sm:px-5 lg:mt-10 lg:px-7">
      <div className="mx-auto w-full max-w-[1700px]">
        {/* Top Dashboard Area */}
        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.7fr)] xl:gap-6">
          {/* User Analytics */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-black/[0.07] bg-white/75 p-3 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:p-5">
            <div className="h-[320px] min-w-0 sm:h-[360px] lg:h-[400px]">
              <UserAnalytics isDashboard={true} />
              </div>
          </section>

          {/* Comparison Cards */}
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {/* Sales Card */}
            <div className="min-w-0 rounded-2xl border border-black/[0.07] bg-white/75 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)]">
              <div className="flex min-h-[150px] items-center justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d383]/10">
                    <BiBorderLeft className="text-[25px] text-black dark:text-[#45cba0]" />
                  </div>

                  <h5 className="mt-4 truncate font-Poppins text-xl font-semibold text-black dark:text-white">
                    {orderComparePrecentenge?.currentMonth}
                  </h5>

                  <h5 className="mt-1 font-Poppins text-sm font-normal text-black/50 dark:text-[#45cba0] sm:text-base">
                    Sales Obtained
                  </h5>
                </div>

                <div className="flex shrink-0 flex-col items-center">
                  <CircularProgressWithLabel
                    value={
                      orderComparePrecentenge?.percentChange > 0
                        ? 100
                        : 0
                    }
                    open={open}
                  />

                  <h5 className="mt-3 text-center text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm">
                    {orderComparePrecentenge?.percentChange > 0
                      ? "+" +
                        orderComparePrecentenge?.percentChange.toFixed(
                          2
                        )
                      : "-" +
                        orderComparePrecentenge?.percentChange.toFixed(
                          2
                        )}
                    %
                  </h5>
                </div>
              </div>
            </div>

            {/* Users Card */}
            <div className="min-w-0 rounded-2xl border border-black/[0.07] bg-white/75 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)]">
              <div className="flex min-h-[150px] items-center justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#42d383]/10">
                    <PiUsersFourLight className="text-[27px] text-black dark:text-[#45cba0]" />
                  </div>

                  <h5 className="mt-4 truncate font-Poppins text-xl font-semibold text-black dark:text-white">
                    {userComparePrecentenge?.currentMonth}
                  </h5>

                  <h5 className="mt-1 font-Poppins text-sm font-normal text-black/50 dark:text-[#45cba0] sm:text-base">
                    New Users
                  </h5>
                </div>

                <div className="flex shrink-0 flex-col items-center">
                  <CircularProgressWithLabel
                    value={
                      userComparePrecentenge?.percentChange > 0
                        ? 100
                        : 0
                    }
                    open={open}
                  />

                  <h5 className="mt-3 text-center text-xs font-medium text-black/60 dark:text-white/60 sm:text-sm">
                    {userComparePrecentenge?.percentChange > 0
                      ? "+" +
                        userComparePrecentenge?.percentChange.toFixed(
                          2
                        )
                      : "-" +
                        userComparePrecentenge?.percentChange.toFixed(
                          2
                        )}
                    %
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Dashboard Area */}
        <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:mt-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
          {/* Orders Analytics */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-black/[0.07] bg-white/75 p-3 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:p-5">
            <div className="h-[320px] min-w-0 sm:h-[360px] lg:h-[400px]">
              <OrdersAnalytics isDashboard={true} />
            </div>
          </section>

          {/* Recent Transactions */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-black/[0.07] bg-white/75 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#111827]/60 dark:shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h5 className="font-Poppins text-base font-semibold text-black dark:text-white sm:text-lg">
                  Recent Transactions
                </h5>

                <p className="mt-1 text-xs text-black/40 dark:text-white/40">
                  Latest course transactions
                </p>
              </div>
            </div>

            <div className="min-w-0 overflow-hidden">
              <AllInvoices isDashboard={true} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;



"use client";

import React, { FC, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "../Widgets/DashboardWidgets";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero: FC<Props> = ({ isDashboard }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <DashboardHeader open={open} setOpen={setOpen} />

      {isDashboard && (
        <div className="w-full min-w-0">
          <DashboardWidgets open={open} />
        </div>
      )}
    </div>
  );
};

export default DashboardHero;



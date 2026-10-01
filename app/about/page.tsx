
"use client";

import React, { useState } from "react";

import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-black dark:bg-[#0b1220] dark:text-white">
      <Heading
        title="About Us - ELearning"
        description="ELearning is a learning management system for helping programmesr."
        keywords="programming, mern"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <main className="w-full">
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default Page;


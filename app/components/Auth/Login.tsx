

"use client";

import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/styles";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);

  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: schema,

    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully");
      setOpen(false);
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
  } = formik;

  return (
    <div className="w-full max-w-md mx-auto px-1 sm:px-2">
      {/* Heading */}
      <div className="mb-6 sm:mb-8">
        <h1
          className={`${styles.title} text-center text-xl sm:text-2xl md:text-3xl`}
        >
          Login With Learnix
        </h1>

        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
          Welcome back! Please enter your details to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        {/* Email */}
        <div className="w-full">
          <label
            className={`${styles.label} block mb-2 text-sm sm:text-base`}
            htmlFor="email"
          >
            Enter your Email
          </label>

          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            autoComplete="email"
            className={`${
              errors.email && touched.email
                ? "border-red-500 focus:border-red-500"
                : ""
            } ${styles.input} w-full text-sm sm:text-base`}
          />

          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block text-xs sm:text-sm">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="w-full mt-5 relative">
          <label
            className={`${styles.label} block mb-2 text-sm sm:text-base`}
            htmlFor="password"
          >
            Enter your password
          </label>

          <div className="relative w-full">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`${
                errors.password && touched.password
                  ? "border-red-500 focus:border-red-500"
                  : ""
              } ${styles.input} w-full pr-10 text-sm sm:text-base`}
            />

            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#2190ff] transition-colors"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#2190ff] transition-colors"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>

          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block text-xs sm:text-sm">
              {errors.password}
            </span>
          )}
        </div>

        {/* Login Button */}
        <div className="w-full mt-6">
          <input
            type="submit"
            value="Login"
            className={`${styles.button} w-full cursor-pointer text-sm sm:text-base`}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Or join with
          </span>

          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Social Login */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Continue with Google"
            onClick={() => signIn("google")}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-[#111827] hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <FcGoogle size={26} />
          </button>

          <button
            type="button"
            aria-label="Continue with GitHub"
            onClick={() => signIn("github")}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-[#111827] hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <AiFillGithub
              size={26}
              className="text-black dark:text-white"
            />
          </button>
        </div>

        {/* Sign Up */}
        <div className="text-center mt-6 sm:mt-8 pb-2">
          <h5 className="font-Poppins text-xs sm:text-sm text-black dark:text-white">
            Don't have an account?
            <span
              className="text-[#2190ff] pl-1 cursor-pointer hover:underline"
              onClick={() => setRoute("Sign-Up")}
            >
              Sign up
            </span>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default Login;



import { styles } from "@/app/styles/styles";

import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error }] =
    useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();

    if (confirmPassword !== newPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({
        oldPassword,
        newPassword,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60 sm:p-7 md:p-8">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="font-Poppins text-xl font-semibold text-black dark:text-white sm:text-2xl md:text-[30px]">
            Change Password
          </h1>

          <p className="mx-auto mt-2 max-w-[500px] text-sm leading-6 text-black/50 dark:text-white/50">
            Update your password to keep your account secure.
          </p>
        </div>

        <form
          onSubmit={passwordChangeHandler}
          className="mx-auto flex w-full max-w-[650px] flex-col"
        >
          {/* Old Password */}
          <div className="mt-2 w-full">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Enter your old password
            </label>

            <input
              type="password"
              className={`${styles.input} !mb-0 !w-full rounded-lg text-black dark:text-white`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          {/* New Password */}
          <div className="mt-5 w-full">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Enter your new password
            </label>

            <input
              type="password"
              className={`${styles.input} !mb-0 !w-full rounded-lg text-black dark:text-white`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-5 w-full">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Confirm your new password
            </label>

            <input
              type="password"
              className={`${styles.input} !mb-0 !w-full rounded-lg text-black dark:text-white`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-7 h-11 w-full rounded-lg border border-[#37a39a] bg-transparent font-medium text-black transition-all duration-200 hover:bg-[#37a39a] hover:text-white dark:text-white sm:w-[180px] sm:self-start"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

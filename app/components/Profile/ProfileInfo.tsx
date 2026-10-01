

import Image from "next/image";
import { styles } from "@/app/styles/styles";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.jpg";

import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);

  const [updateAvatar, { isSuccess, error }] =
    useUpdateAvatarMutation();

  const [
    editProfile,
    { isSuccess: success, error: updateError },
  ] = useEditProfileMutation();

  const [loadUser, setLoaduser] = useState(false);

  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;

        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoaduser(true);
    }

    if (error || updateError) {
      console.log(error);
    }

    if (success) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  const profileImage =
    user.avatar || avatar
      ? user.avatar?.url || avatar
      : avatarIcon;

  return (
    <div className="w-full">
      {/* Profile Header */}
      <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60 sm:p-7">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Image
              width={140}
              height={140}
              src={profileImage}
              alt=""
              className="h-[110px] w-[110px] cursor-pointer rounded-full border-4 border-[#37a39a] object-cover shadow-md sm:h-[140px] sm:w-[140px]"
            />

            <input
              type="file"
              name=""
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png, image/jpg, image/jgep, image/webp"
            />

            <label htmlFor="avatar">
              <div className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-900 shadow-md transition-transform hover:scale-105 sm:bottom-2 sm:right-2">
                <AiOutlineCamera
                  size={19}
                  className="text-white"
                />
              </div>
            </label>
          </div>

          <h1 className="mt-4 text-xl font-semibold text-black dark:text-white sm:text-2xl">
            {user?.name}
          </h1>

          <p className="mt-1 break-all text-sm text-black/50 dark:text-white/50">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60 sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
            Profile Information
          </h2>

          <p className="mt-1 text-sm text-black/50 dark:text-white/50">
            Update your account information.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mx-auto w-full max-w-[650px]">
            {/* Name */}
            <div className="w-full">
              <label
                htmlFor="full-name"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
                Full Name
              </label>

              <input
                id="full-name"
                type="text"
                className={`${styles.input} !mb-0 !w-full rounded-lg`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mt-5 w-full">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-black dark:text-white"
              >
                Email Address
              </label>

              <input
                id="email"
                type="text"
                className={`${styles.input} !mb-0 !w-full cursor-not-allowed rounded-lg opacity-70`}
                readOnly
                value={user?.email}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-7 h-11 w-full rounded-lg border border-[#37a39a] bg-transparent px-6 font-medium text-black transition-all duration-200 hover:bg-[#37a39a] hover:text-white dark:text-white sm:w-[180px]"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;



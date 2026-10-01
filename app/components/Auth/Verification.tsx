
"use client";

import { styles } from "@/app/styles/styles";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);

  const [activation, { isSuccess, error }] = useActivationMutation();

  const [invalidError, setInvalidError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);

    const newVerifyNumber = {
      ...verifyNumber,
      [index]: value,
    };

    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-1 sm:px-2">
      {/* Heading */}
      <div className="text-center">
        <h1
          className={`${styles.title} text-xl sm:text-2xl md:text-3xl`}
        >
          Verify Your Account
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
          Enter the 4-digit verification code sent to your email address to
          activate your Learnix account.
        </p>
      </div>

      {/* Verification Icon */}
      <div className="w-full flex items-center justify-center mt-6 sm:mt-8">
        <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center shadow-lg shadow-blue-500/20">
          <VscWorkspaceTrusted
            size={36}
            className="text-white sm:w-10 sm:h-10"
          />
        </div>
      </div>

      {/* OTP Inputs */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-10">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            inputMode="numeric"
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            aria-label={`Verification digit ${index + 1}`}
            className={`
              w-[52px]
              h-[58px]
              xs:w-[58px]
              sm:w-[62px]
              sm:h-[65px]
              md:w-[65px]
              md:h-[65px]
              bg-transparent
              border-[2px]
              sm:border-[3px]
              rounded-[10px]
              text-black
              dark:text-white
              text-center
              text-lg
              sm:text-xl
              font-Poppins
              outline-none
              transition-all
              duration-200
              focus:border-[#497DF2]
              focus:ring-2
              focus:ring-[#497DF2]/20
              ${
                invalidError
                  ? "shake border-red-500"
                  : "dark:border-white/70 border-[#0000004a]"
              }
            `}
          />
        ))}
      </div>

      {/* Error Message */}
      {invalidError && (
        <p className="text-center text-red-500 text-xs sm:text-sm mt-4">
          Please enter a valid 4-digit verification code.
        </p>
      )}

      {/* Verify Button */}
      <div className="w-full flex justify-center mt-7 sm:mt-9">
        <button
          type="button"
          className={`${styles.button} w-full max-w-[280px] sm:max-w-[300px] text-sm sm:text-base`}
          onClick={verificationHandler}
        >
          Verify OTP
        </button>
      </div>

      {/* Back to Login */}
      <div className="text-center mt-6 sm:mt-8 pb-2">
        <h5 className="font-Poppins text-xs sm:text-sm text-black dark:text-white">
          Go back to sign in?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer hover:underline"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Verification;

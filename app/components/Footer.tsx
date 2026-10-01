
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="mt-10 w-full">
      {/* Top Divider */}
      <div className="border-t border-black/[0.08] dark:border-white/[0.12]" />

      <div className="mx-auto w-[92%] max-w-7xl px-2 py-12 sm:w-[90%] sm:px-4 md:py-14 lg:px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-12">
          {/* About */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-black dark:text-white sm:text-xl">
              About
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  Our Stroy
                </Link>
              </li>

              <li>
                <Link
                  href="/policy"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  Faq
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-black dark:text-white sm:text-xl">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/courses"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-black dark:text-white sm:text-xl">
              Social Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  Youtube
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  Instagram
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="inline-block text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white sm:text-base"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-black dark:text-white sm:text-xl">
              Contact Info
            </h3>

            <div className="space-y-2">
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
                Call us: 0435435093485
              </p>

              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
                Call us: 0435435093485
              </p>

              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
                Call us: 0435435093485
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-black/[0.08] pt-6 dark:border-white/[0.12]">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Copyriht @ 2026 Learnix | All Rights Reverse
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


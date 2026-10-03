// "use client";

// import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";

// import {
//   useGetAllNotificationQuery,
//   useUpdateNotificationStatusMutation,
// } from "@/redux/features/notifications/notificationsApi";

// import React, { FC, useEffect, useState } from "react";

// import { IoMdNotificationsOutline } from "react-icons/io";
// import socketIO from "socket.io-client";
// import { format } from "timeago.js";

// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

// const socketId = socketIO(ENDPOINT, {
//   transports: ["websocket"],
// });

// type Props = {
//   open?: boolean;
//   setOpen?: any;
// };

// const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
//   const { data, refetch } = useGetAllNotificationQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const [updateNotificationStatus, { isSuccess }] =
//     useUpdateNotificationStatusMutation();

//   const [notification, setNotification] = useState<any>([]);

//  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

// useEffect(() => {
//   const audioElement = new Audio(
//     "https://res.cloudinary.com/dc9q2yi1s/video/upload/v1714814391/uf9ylzi2ca6prvaujmad.wav"
//   );

//   setAudio(audioElement);

//   return () => {
//     audioElement.pause();
//     audioElement.currentTime = 0;
//   };
// }, []);

//   const playerNotificationSound = async () => {
//     try {
//       await audio?.play();
//       console.log("Notification sound played");
//     } catch (error) {
//       console.error("Audio playback failed:", error);
//     }
//   };

//   useEffect(() => {
//     if (data) {
//       setNotification(
//         data.notifications.filter(
//           (item: any) => item.status === "unread"
//         )
//       );
//     }

//     if (isSuccess) {
//       refetch();
//     }

//     audio?.load();
//   }, [data, isSuccess]);

//   useEffect(() => {
//     socketId.on("newNotification", (data) => {
//       refetch();
//       playerNotificationSound();
//     });
//   }, []);

//   const handleNotificationStatusChange = async (id: string) => {
//     await updateNotificationStatus(id);
//   };

//   return (
//     <header className="fixed right-0 top-0 z-[9999] flex w-full items-center justify-end px-3 py-3 sm:px-5 sm:py-4 lg:px-7">
//       <div className="flex items-center gap-2 rounded-2xl border border-black/[0.06] bg-white/80 px-2 py-1.5 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0f172a]/80 sm:gap-3 sm:px-3">
//         {/* Theme Switcher */}
//         <div className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06] sm:h-10 sm:w-10">
//           <ThemeSwitcher />
//         </div>

//         {/* Notification Button */}
//         <div
//           className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 hover:bg-black/[0.05] active:scale-95 dark:hover:bg-white/[0.06] sm:h-10 sm:w-10"
//           onClick={() => setOpen(!open)}
//         >
//           <IoMdNotificationsOutline className="text-[23px] text-black dark:text-white sm:text-[25px]" />

//           {/* Notification Count */}
//           {notification && notification.length > 0 && (
//             <span className="absolute -right-0.5 -top-1 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#3ccba0] px-1 text-[10px] font-semibold leading-none text-white shadow-sm sm:-right-1 sm:-top-1 sm:min-h-[20px] sm:min-w-[20px] sm:text-[11px]">
//               {notification.length > 99
//                 ? "99+"
//                 : notification.length}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Notification Dropdown */}
//       {open && (
//         <div className="absolute right-3 top-[64px] z-[99999] flex w-[calc(100%-24px)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#111c43] sm:right-5 sm:top-[72px] sm:w-[390px]">
//           {/* Header */}
//           <div className="flex items-center justify-between border-b border-black/[0.07] px-4 py-3.5 dark:border-white/[0.08] sm:px-5">
//             <div>
//               <h5 className="font-Poppins text-base font-semibold text-black dark:text-white sm:text-lg">
//                 Notifications
//               </h5>

//               <p className="mt-0.5 text-xs text-black/45 dark:text-white/45">
//                 {notification?.length || 0} unread notification
//                 {notification?.length === 1 ? "" : "s"}
//               </p>
//             </div>

//             {notification?.length > 0 && (
//               <span className="rounded-full bg-[#3ccba0]/10 px-2.5 py-1 text-[11px] font-medium text-[#269c7a] dark:bg-[#3ccba0]/15 dark:text-[#5ee0b8]">
//                 Unread
//               </span>
//             )}
//           </div>

//           {/* Notification List */}
//           <div className="max-h-[55vh] overflow-y-auto overscroll-contain sm:max-h-[60vh]">
//             {notification && notification.length > 0 ? (
//               notification.map((item: any, index: number) => (
//                 <div
//                   className="border-b border-black/[0.06] bg-black/[0.015] px-3 py-3 transition-colors hover:bg-black/[0.035] dark:border-white/[0.07] dark:bg-white/[0.015] dark:hover:bg-white/[0.035] sm:px-4"
//                   key={index}
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     {/* Notification Content */}
//                     <div className="min-w-0 flex-1">
//                       <p className="break-words text-sm font-semibold text-black dark:text-white">
//                         {item.title}
//                       </p>

//                       <p className="mt-1.5 break-words text-xs leading-5 text-black/65 dark:text-white/65 sm:text-sm">
//                         {item.message}
//                       </p>

//                       <p className="mt-2 text-[11px] text-black/40 dark:text-white/40 sm:text-xs">
//                         {format(item.createdAt)}
//                       </p>
//                     </div>

//                     {/* Mark As Read */}
//                     <button
//                       type="button"
//                       className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-medium text-[#269c7a] transition-colors hover:bg-[#3ccba0]/10 hover:text-[#1f8768] dark:text-[#5ee0b8] dark:hover:bg-[#3ccba0]/10 sm:text-[11px]"
//                       onClick={() =>
//                         handleNotificationStatusChange(item._id)
//                       }
//                     >
//                       Mark as read
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="flex min-h-[220px] flex-col items-center justify-center px-5 text-center">
//                 <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#3ccba0]/10">
//                   <IoMdNotificationsOutline className="text-2xl text-[#3ccba0]" />
//                 </div>

//                 <p className="text-sm font-medium text-black/70 dark:text-white/70">
//                   No new notifications
//                 </p>

//                 <p className="mt-1 text-xs text-black/40 dark:text-white/40">
//                   You&apos;re all caught up.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default DashboardHeader;


"use client";

import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";

import {
  useGetAllNotificationQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";

import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
});

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notification, setNotification] = useState<any>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Create Audio only on the client
  useEffect(() => {
    const audioElement = new Audio(
      "https://res.cloudinary.com/dc9q2yi1s/video/upload/v1714814391/uf9ylzi2ca6prvaujmad.wav"
    );

    setAudio(audioElement);

    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  const playerNotificationSound = async () => {
    if (!audio) return;

    try {
      await audio.play();
      console.log("Notification sound played");
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  // Update notification list
  useEffect(() => {
    if (data?.notifications) {
      setNotification(
        data.notifications.filter(
          (item: any) => item.status === "unread"
        )
      );
    }

    if (isSuccess) {
      refetch();
    }

    if (audio) {
      audio.load();
    }
  }, [data, isSuccess, audio, refetch]);

  // Listen for new notifications
  useEffect(() => {
    const handleNewNotification = () => {
      refetch();
      playerNotificationSound();
    };

    socketId.on("newNotification", handleNewNotification);

    return () => {
      socketId.off("newNotification", handleNewNotification);
    };
  }, [refetch, audio]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <header className="fixed right-0 top-0 z-[9999] flex w-full items-center justify-end px-3 py-3 sm:px-5 sm:py-4 lg:px-7">
      <div className="flex items-center gap-2 rounded-2xl border border-black/[0.06] bg-white/80 px-2 py-1.5 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0f172a]/80 sm:gap-3 sm:px-3">

        {/* Theme Switcher */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06] sm:h-10 sm:w-10">
          <ThemeSwitcher />
        </div>

        {/* Notification Button */}
        <div
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 hover:bg-black/[0.05] active:scale-95 dark:hover:bg-white/[0.06] sm:h-10 sm:w-10"
          onClick={() => setOpen?.(!open)}
        >
          <IoMdNotificationsOutline className="text-[23px] text-black dark:text-white sm:text-[25px]" />

          {/* Notification Count */}
          {notification && notification.length > 0 && (
            <span className="absolute -right-0.5 -top-1 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#3ccba0] px-1 text-[10px] font-semibold leading-none text-white shadow-sm sm:-right-1 sm:-top-1 sm:min-h-[20px] sm:min-w-[20px] sm:text-[11px]">
              {notification.length > 99
                ? "99+"
                : notification.length}
            </span>
          )}
        </div>
      </div>

      {/* Notification Dropdown */}
      {open && (
        <div className="absolute right-3 top-[64px] z-[99999] flex w-[calc(100%-24px)] max-w-[390px] flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#111c43] sm:right-5 sm:top-[72px] sm:w-[390px]">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.07] px-4 py-3.5 dark:border-white/[0.08] sm:px-5">
            <div>
              <h5 className="font-Poppins text-base font-semibold text-black dark:text-white sm:text-lg">
                Notifications
              </h5>

              <p className="mt-0.5 text-xs text-black/45 dark:text-white/45">
                {notification?.length || 0} unread notification
                {notification?.length === 1 ? "" : "s"}
              </p>
            </div>

            {notification?.length > 0 && (
              <span className="rounded-full bg-[#3ccba0]/10 px-2.5 py-1 text-[11px] font-medium text-[#269c7a] dark:bg-[#3ccba0]/15 dark:text-[#5ee0b8]">
                Unread
              </span>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-[55vh] overflow-y-auto overscroll-contain sm:max-h-[60vh]">
            {notification && notification.length > 0 ? (
              notification.map((item: any, index: number) => (
                <div
                  className="border-b border-black/[0.06] bg-black/[0.015] px-3 py-3 transition-colors hover:bg-black/[0.035] dark:border-white/[0.07] dark:bg-white/[0.015] dark:hover:bg-white/[0.035] sm:px-4"
                  key={index}
                >
                  <div className="flex items-start justify-between gap-3">

                    {/* Notification Content */}
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-semibold text-black dark:text-white">
                        {item.title}
                      </p>

                      <p className="mt-1.5 break-words text-xs leading-5 text-black/65 dark:text-white/65 sm:text-sm">
                        {item.message}
                      </p>

                      <p className="mt-2 text-[11px] text-black/40 dark:text-white/40 sm:text-xs">
                        {format(item.createdAt)}
                      </p>
                    </div>

                    {/* Mark As Read */}
                    <button
                      type="button"
                      className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-medium text-[#269c7a] transition-colors hover:bg-[#3ccba0]/10 hover:text-[#1f8768] dark:text-[#5ee0b8] dark:hover:bg-[#3ccba0]/10 sm:text-[11px]"
                      onClick={() =>
                        handleNotificationStatusChange(item._id)
                      }
                    >
                      Mark as read
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center px-5 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#3ccba0]/10">
                  <IoMdNotificationsOutline className="text-2xl text-[#3ccba0]" />
                </div>

                <p className="text-sm font-medium text-black/70 dark:text-white/70">
                  No new notifications
                </p>

                <p className="mt-1 text-xs text-black/40 dark:text-white/40">
                  You&apos;re all caught up.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;


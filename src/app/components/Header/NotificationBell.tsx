"use client";

import { BellIcon } from "@heroicons/react/24/outline";
import useNotifications from "./hooks/useNotifications";
import Link from "next/link";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { TwicImg } from "@twicpics/components/react";

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const {
    notifications,
    unreadNotifications,
    notificationsLoading,
    markAsRead,
  } = useNotifications();

  return (
    <div className="relative">
      {showNotifications && (
        <div
          onClick={() => setShowNotifications(false)}
          className="fixed left-0 top-0 z-10 h-[100dvh] w-[100dvw] cursor-pointer"
        ></div>
      )}
      <div
        className={`fixed left-0 top-header z-10 flex max-h-[500px] w-full origin-top flex-col items-center gap-2 overflow-y-auto rounded-sm bg-bg-600 p-2 transition-all md:absolute md:-bottom-2 md:left-[unset] md:right-4 md:top-[unset] md:w-[300px] md:origin-top-right md:translate-y-full ${
          showNotifications ? "scale-100" : "scale-0"
        }`}
      >
        {notificationsLoading && <Spinner className="h-5 w-5 fill-white" />}
        {notifications.length === 0 && !notificationsLoading && (
          <span className="text-sm opacity-50">No notifications</span>
        )}
        {notifications.map((notification) => (
          <Link
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            href={`/a/${notification.sourceOrigin?.key || ""}`}
            className={`flex w-full flex-grow flex-row items-center gap-3 rounded-md bg-white bg-opacity-0 p-2 transition-all md:hover:bg-opacity-5 ${
              notification.is_read ? "opacity-50" : "opacity-100"
            }`}
          >
            {notification.sourceAuthor && (
              <TwicImg
                src={`/users/${
                  notification.sourceAuthor.imageUrl.split("/").slice(-1)[0]
                }`}
                className="h-5 w-5 rounded-full"
              />
            )}
            <div className="flex flex-grow flex-col gap-0 overflow-hidden">
              <span className="min-w-0 overflow-x-hidden text-ellipsis whitespace-nowrap text-sm leading-tight">
                {notification.sourceAuthor?.username || ""}
                <span className="opacity-75"> commented on </span>
                {notification.sourceOrigin?.title || ""}
              </span>
              <span className="min-w-0 overflow-x-hidden text-ellipsis whitespace-nowrap text-sm font-light leading-tight opacity-50">
                {notification.source?.text || ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => setShowNotifications(true)}
        className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white bg-opacity-0 transition-all md:hover:bg-opacity-10"
      >
        {unreadNotifications.length > 0 && (
          <>
            <div className="absolute right-0.5 top-0.5 h-1.5 w-1.5 animate-ping rounded-full bg-orange-400"></div>
            <div className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-orange-400"></div>
          </>
        )}
        <BellIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NotificationBell;

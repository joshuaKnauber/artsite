import { RichNotification } from "@/app/api/notifications/route";
import { useClerk } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const useNotifications = () => {
  const { user } = useClerk();

  const fetchNotifications = async () => {
    const res = await fetch(`/api/notifications`);
    if (!res.ok) {
      console.error(res);
      throw new Error("Failed to fetch notifications");
    }
    const data = (await res.json()) as RichNotification[];
    return data;
  };

  const {
    data: notifications,
    isLoading: notificationsLoading,
    refetch: refetchNotifications,
  } = useQuery(["notifications"], fetchNotifications, {
    enabled: user?.id !== undefined,
    refetchInterval: 1000 * 60, // every minute
  });

  const markAsRead = async (notificationId: number) => {
    try {
      const res = await fetch(`/api/notifications/${notificationId}`, {
        method: "POST",
      });
      if (!res.ok) {
        console.error(res);
        throw new Error("Failed to mark notification as read");
      }
      refetchNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  const unreadNotifications =
    (notifications?.filter((n) => !n.is_read) as RichNotification[]) || [];

  const readNotifications =
    (notifications?.filter((n) => n.is_read) as RichNotification[]) || [];

  return {
    notifications: notifications || [],
    unreadNotifications,
    readNotifications,
    notificationsLoading,
    refetchNotifications,
    markAsRead,
  };
};

export default useNotifications;

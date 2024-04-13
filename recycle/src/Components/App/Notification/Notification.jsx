import { useQuery } from "react-query";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import { fetchNotifications, fetchUser } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const serVer = `https://recycle-app-backend.vercel.app`;

const Notification = () => {
  // function to mark all unread messages as read
  const markNotificationsAsRead = useCallback(async () => {
    try {
      const res = await axios.put(`${serVer}/markUnread/${role}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, []); // Include role in dependency array

  useEffect(() => {
    markNotificationsAsRead();
  }, [markNotificationsAsRead]); // Include markNotificationsAsRead in dependency array

  //  fetch notifications data
  const { data, isLoading, isError } = useQuery("user", fetchUser);
  const {
    data: notificationData,
    isLoading: notificationLoading,
    isError: notificationError,
  } = useQuery("notifications", fetchNotifications);

  const [showOtherRoute, setShowOtherRoute] = useState(false);

  if (isLoading || notificationLoading) return <PageLoader />;

  if (isError || notificationError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { name, role } = data;

  // fetch all notifications for admin
  const adminNotifications = notificationData;

  // Filter notifications by the user's name
  const userNotifications = notificationData.filter(
    (item) => item.messageOwner === name
  );

  const hasNotifications = userNotifications.length > 0; // Check if userNotifications array has notifications

  return (
    <div className="notifications">
      <HeaderGoBack h1="Notifications" />
      <div>
        {/* USER NOTIFICATIONS */}
        {role === "general-public" && (
          <div className="user-notification">
            {/* Button to toggle between routes */}
            <button onClick={() => setShowOtherRoute(!showOtherRoute)}>
              {showOtherRoute
                ? "Show Notifications"
                : "View Timer Notifications"}
            </button>

            {/* Render content based on toggle state */}
            {showOtherRoute ? (
              <div className="notification-display">
                {hasNotifications && role === "user" ? (
                  <ul>
                    {userNotifications.map((notification) => (
                      <li key={notification._id}>{notification.timeMessage}</li>
                    ))}
                  </ul>
                ) : (
                  role === "general-public" && <div>No Notifications yet</div>
                )}
              </div>
            ) : (
              <div>
                {/* Render content for current route */}
                <div className="notification-display">
                  {hasNotifications ? (
                    <ul>
                      {userNotifications.map((notification) => (
                        <li key={notification._id}>
                          {notification.userMessage?.message}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    role === "general-public" && <div>No Notifications yet</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* ADMIN NOTIFICATIONS */}
        <div className="notification-display">
          {role === "admin" ? (
            <ul>
              {adminNotifications.map((notification) => (
                <li key={notification._id}>
                  {notification.adminMessage.message}
                </li>
              ))}
            </ul>
          ) : (
            role === "admin" && <div>No Notifications yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;

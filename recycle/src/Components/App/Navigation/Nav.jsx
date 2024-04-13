import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchNotifications, fetchUser } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";

const Nav = ({ toggleRoute }) => {
  // Destructure the array elements
  const { routeLink } = toggleRoute[0][0];
  const { routeName } = toggleRoute[0][1];
  const toggleNav = toggleRoute[1];

  const { data, isLoading, isError } = useQuery("user", fetchUser);

  const {
    data: notificationData,
    isLoading: notificationLoading,
    isError: notificationError,
  } = useQuery("notifications", fetchNotifications);

  if (isLoading || notificationLoading) return <PageLoader />;

  if (isError || notificationError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { role } = data;

  // filter unread messages and get length for admin
  const unreadAdminNotifications = notificationData.filter(
    (notification) => notification.adminMessage.status === "unread"
  );
  const unreadAdminCount = unreadAdminNotifications.length;

  // filter unread messages and get length for general public
  const unreadGeneralPublicNotifications = notificationData.filter(
    (notification) => notification.userMessage?.status === "unread"
  );
  const unreadUserCount = unreadGeneralPublicNotifications.length;

  return (
    <div className="nav-bar">
      <div>
        <button onClick={toggleNav}>
          <FaTimes />
        </button>
        {/* CONDITIONALLY RENDER NOTIFICATION ICON FOR ONLY ADMIN AND GENERAL PUBLIC */}
        {(role === "general-public" || role === "admin") &&
          (role === "admin" ? (
            <Link to="/notifications">
              <IoMdNotificationsOutline />
              <div>{unreadAdminCount}</div>
            </Link>
          ) : (
            <Link to="/notifications">
              <IoMdNotificationsOutline />
              <div>{unreadUserCount}</div>
            </Link>
          ))}
      </div>

      <ul>
        <li>
          <Link to={routeLink}>{routeName}</Link>
        </li>
        <li>
          <Link to="/simulation">Simulation</Link>
        </li>
      </ul>
    </div>
  );
};

Nav.propTypes = {
  toggleRoute: PropTypes.array.isRequired,
};

export default Nav;

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

  // get notification length
  const notificationCounter = notificationData.length;

  return (
    <div className="nav-bar">
      <div>
        <button onClick={toggleNav}>
          <FaTimes />
        </button>
        {(role === "general-public" || role === "admin") && (
          <Link to="/notifications">
            <IoMdNotificationsOutline />
            <div>{notificationCounter}</div>
          </Link>
        )}
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

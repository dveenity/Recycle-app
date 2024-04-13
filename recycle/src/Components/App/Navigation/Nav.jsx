import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const Nav = ({ toggleRoute }) => {
  // Destructure the array elements from props
  const { routeLink } = toggleRoute[0][0];
  const { routeName } = toggleRoute[0][1];
  const toggleNav = toggleRoute[1];
  const adminCount = toggleRoute[2][0];
  const userCount = toggleRoute[2][1];
  const role = toggleRoute[3];

  // destructure obj from counts
  const { unreadAdminCount } = adminCount;
  const { unreadUserCount } = userCount;

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

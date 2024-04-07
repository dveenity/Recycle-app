import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useQuery } from "react-query";
import { fetchUser } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";

const Nav = ({ toggleRoute }) => {
  // Destructure the array elements
  const { routeLink } = toggleRoute[0][0];
  const { routeName } = toggleRoute[0][1];
  const toggleNav = toggleRoute[1];

  const { data, isLoading, isError } = useQuery("user", fetchUser);

  if (isLoading) return <PageLoader />;

  if (isError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { role } = data;

  return (
    <div className="nav-bar">
      <div>
        <button onClick={toggleNav}>
          <FaTimes />
        </button>
        {(role === "user" || role === "admin") && (
          <Link to="/notifications">
            <IoMdNotificationsOutline />
          </Link>
        )}
      </div>

      <ul>
        <li>
          <Link to={routeLink}>{routeName}</Link>
        </li>
      </ul>
    </div>
  );
};

Nav.propTypes = {
  toggleRoute: PropTypes.array.isRequired,
};

export default Nav;

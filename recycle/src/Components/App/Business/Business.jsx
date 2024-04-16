import { Link } from "react-router-dom";
import { FcCollaboration } from "react-icons/fc";
import PropTypes from "prop-types";

const Business = ({ userItems }) => {
  const name = userItems[0];

  return (
    <div className="user-route">
      <h3>Welcome {name}</h3>
      <div>
        <div>
          Collaborations: <span>{10}</span>
        </div>
      </div>
      <div>
        <h3>Dashboard</h3>
        <ul>
          <li>
            <Link to="/collaboration">
              <div>Collabs</div>
              <FcCollaboration />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Business.propTypes = {
  userItems: PropTypes.array.isRequired,
};

export default Business;

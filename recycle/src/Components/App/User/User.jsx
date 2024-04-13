import { Link } from "react-router-dom";
import { fetchRecycledItems } from "../../Hooks/useFetch";
import { useQuery } from "react-query";
import PageLoader from "../../Animations/PageLoader";
import { FaRecycle } from "react-icons/fa";
import { SiBaremetrics } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import PropTypes from "prop-types";

const User = ({ userItems }) => {
  const name = userItems;

  const {
    data: recycledItems,
    isLoading: recycledItemsLoading,
    isError: recycledItemsError,
  } = useQuery("recycledItems", fetchRecycledItems);

  if (recycledItemsLoading) return <PageLoader />;

  if (recycledItemsError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  // Filter recycled items by the user's name
  const userRecycledItems = recycledItems.filter(
    (item) => item.userName === name
  );

  const totalRecycledItems = userRecycledItems.length;

  // Calculate total points earned
  const totalRecycledPoints = userRecycledItems.reduce(
    (total, item) => total + item.pointsEarned,
    0
  );

  return (
    <div className="user-route">
      <h3>Welcome {name}</h3>
      <div>
        <div>
          Recycled Items: <span>{totalRecycledItems}</span>
        </div>
        <div>
          Points Earned: <span>{totalRecycledPoints}</span>
        </div>
      </div>
      <div>
        <h3>Dashboard</h3>
        <ul>
          <li>
            <Link to="/recycle">
              <div>Recycle</div>
              <FaRecycle />
            </Link>
          </li>
          <li>
            <Link to="/metrics">
              <div>Metrics</div>
              <SiBaremetrics />
            </Link>
          </li>
          <li>
            <Link to="/feedback">
              <div>Feedback</div>
              <VscFeedback />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

User.propTypes = {
  userItems: PropTypes.array.isRequired,
};

export default User;

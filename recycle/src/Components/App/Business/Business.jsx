import { Link } from "react-router-dom";
import { FcCollaboration } from "react-icons/fc";
import PropTypes from "prop-types";
import { fetchRecycledItems } from "../../Hooks/useFetch";
import { useQuery } from "react-query";
import PageLoader from "../../Animations/PageLoader";
import NotifAnim from "../../Animations/NotifAnim";
import { FaRecycle } from "react-icons/fa";
import { SiBaremetrics } from "react-icons/si";

const Business = ({ userItems }) => {
  const name = userItems[0];
  const userNotifications = userItems[1];

  const hasUserNotifications = userNotifications?.length > 0;

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
  let totalRecycledPoints = userRecycledItems.reduce(
    (total, item) => total + item.pointsEarned,
    0
  );

  let unit = null;
  if (totalRecycledPoints > 1000) {
    totalRecycledPoints /= 1000;
    totalRecycledPoints = totalRecycledPoints.toFixed(1);
    unit = "k";
  }

  return (
    <div className="user-route">
      <h3>Welcome {name}</h3>
      <div>
        <div>
          Recycled Items:
          <span>{totalRecycledItems}</span>
        </div>
        <div>
          Points Earned:
          <span>
            {totalRecycledPoints}
            {unit}
          </span>
        </div>
        <div>
          Collaborations: <span>{8}</span>
        </div>
      </div>
      <div>
        <h3>Dashboard</h3>
        <ul>
          <li>
            <Link to="/businessRecycle">
              <div>Recycle</div>
              <FaRecycle />
            </Link>
          </li>
          <li>
            <Link to="/businessMetrics">
              <div>Metrics</div>
              <SiBaremetrics />
            </Link>
          </li>
          <li>
            <Link to="/collaboration">
              <div>Collabs</div>
              <FcCollaboration />
            </Link>
          </li>
        </ul>
      </div>
      <div className="chain-log">
        <h3>Environmental Impact</h3>
        <ul>
          {hasUserNotifications ? (
            userNotifications.map((notification) => (
              <li key={notification._id}>
                {notification.impactMessage?.message}
              </li>
            ))
          ) : (
            <div className="chain-log-none">
              <div>None yet</div>
              <NotifAnim />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

Business.propTypes = {
  userItems: PropTypes.array.isRequired,
};

export default Business;

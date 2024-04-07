import { Link } from "react-router-dom";
import { fetchRecycledItems, fetchUser } from "../../Hooks/useFetch";
import { useQuery } from "react-query";
import PageLoader from "../../Animations/PageLoader";
import { FaRecycle } from "react-icons/fa";
import { SiBaremetrics } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";

const User = () => {
  const { data, isLoading, isError } = useQuery("user", fetchUser);
  const {
    data: recycledItems,
    isLoading: recycledItemsLoading,
    isError: recycledItemsError,
  } = useQuery("recycledItems", fetchRecycledItems);

  if (isLoading || recycledItemsLoading) return <PageLoader />;

  if (isError || recycledItemsError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { name } = data;

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
          recycled items: <span>{totalRecycledItems}</span>
        </div>
        <div>
          points earned: <span>{totalRecycledPoints}</span>
        </div>
      </div>
      <div>
        <h3>dashboard</h3>
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

export default User;

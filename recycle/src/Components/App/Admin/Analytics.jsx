import { useQuery } from "react-query";
import PageLoader from "../../Animations/PageLoader";
import {
  fetchFeedbacks,
  fetchPDF,
  fetchPolicies,
  fetchRecycledItems,
  fetchUsers,
} from "../../Hooks/useFetch";
import HeaderGoBack from "../../Custom/HeaderGoBack";

const Analytics = () => {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery("users", fetchUsers);

  const {
    data: recycledItems,
    isLoading: recycledItemsLoading,
    isError: recycledItemsError,
  } = useQuery("recycledItems", fetchRecycledItems);

  const {
    data: research,
    isLoading: researchLoading,
    isError: researchError,
  } = useQuery("PDF", fetchPDF);

  const {
    data: policies,
    isLoading: policiesLoading,
    isError: policiesError,
  } = useQuery("policy", fetchPolicies);

  const {
    data: feedbacks,
    isLoading: feedbacksLoading,
    isError: feedbacksError,
  } = useQuery("feedbacks", fetchFeedbacks);

  if (
    recycledItemsLoading ||
    researchLoading ||
    usersLoading ||
    policiesLoading ||
    feedbacksLoading
  ) {
    return <PageLoader />;
  }

  if (
    recycledItemsError ||
    feedbacksError ||
    researchError ||
    usersError ||
    policiesError
  ) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  // get total numbers of users
  const totalUsers = users.length;

  // get total numbers of recycled items
  const recycledItemsLength = recycledItems.length;

  // Calculate total points earned
  const totalRecycledPoints = recycledItems.reduce(
    (total, item) => total + item.pointsEarned,
    0
  );

  // Calculate total weight
  let totalRecycledWeight = recycledItems.reduce(
    (total, item) => total + item.weight,
    0
  );

  // calculate total research posted
  const researches = research.length;

  // calculate total policies posted
  const policiesLength = policies.length;

  // calculate total feedbacks
  const feedbacksLength = feedbacks.length;

  return (
    <div className="analytics">
      <HeaderGoBack h1="Analytics" />
      <ul>
        <li>
          <h3>users</h3>
          <div>{totalUsers}</div>
        </li>
        <li>
          <h3>recycled items</h3>
          <div>{recycledItemsLength}</div>
        </li>
        <li>
          <h3>items weight</h3>
          <div>{totalRecycledWeight}g</div>
        </li>
        <li>
          <h3>earned points</h3>
          <div>{totalRecycledPoints}</div>
        </li>
        <li>
          <h3>research</h3>
          <div>{researches}</div>
        </li>
        <li>
          <h3>policies</h3>
          <div>{policiesLength}</div>
        </li>
        <li>
          <h3>feedbacks</h3>
          <div>{feedbacksLength}</div>
        </li>
      </ul>
    </div>
  );
};

export default Analytics;

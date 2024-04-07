import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  fetchRecycledItems,
  fetchUser,
  fetchUsers,
} from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import { FaUsers } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
import { TbDeviceAnalytics } from "react-icons/tb";

const AdminHome = () => {
  const { data, isLoading, isError } = useQuery("user", fetchUser);
  const {
    data: recycledItems,
    isLoading: recycledItemsLoading,
    isError: recycledItemsError,
  } = useQuery("recycledItems", fetchRecycledItems);
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery("users", fetchUsers);

  if (isLoading || recycledItemsLoading || usersLoading) return <PageLoader />;

  if (isError || recycledItemsError || usersError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  // extract name from data
  const { name } = data;

  // get users && recycled items length
  const totalRecycledItems = recycledItems.length;

  // Calculate total points earned
  const totalRecycledPoints = recycledItems.reduce(
    (total, item) => total + item.pointsEarned,
    0
  );

  // filter admin from users
  const filteredUsers = users.filter((item) => item.role !== "admin");

  // calculate total users
  const totalUsers = filteredUsers.length;

  // dashboard
  const dashboard = [
    { name: "Users", link: "/users", icon: <FaUsers /> },
    {
      name: "Features",
      link: "/featureManagement",
      icon: <GiSkills />,
    },
    { name: "Feedbacks", link: "/manageFeedbacks", icon: <VscFeedback /> },
    { name: "Analytics", link: "/analytics", icon: <TbDeviceAnalytics /> },
  ];

  const dashboardOutput = dashboard.map((dash, i) => (
    <li key={i}>
      <Link to={dash.link}>
        <div>{dash.name}</div>
        {dash.icon}
      </Link>
    </li>
  ));

  return (
    <div className="user-route">
      <h3>Welcome {name}</h3>
      <div>
        <div>
          users: <span>{totalUsers}</span>
        </div>
        <div>
          Recycled Items: <span>{totalRecycledItems}</span>
        </div>
        <div>
          Points Earned: <span>{totalRecycledPoints}</span>
        </div>
      </div>
      <div>
        <h3>Dashboard</h3>
        <ul>{dashboardOutput}</ul>
      </div>
    </div>
  );
};

export default AdminHome;

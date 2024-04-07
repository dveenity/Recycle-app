import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchPolicies, fetchUser } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import { FcCollaboration } from "react-icons/fc";
import { MdOutlinePolicy } from "react-icons/md";

const Government = () => {
  const { data, isLoading, isError } = useQuery("user", fetchUser);
  const {
    data: policies,
    isLoading: policiesLoading,
    isError: policiesError,
  } = useQuery("policy", fetchPolicies);

  if (isLoading || policiesLoading) return <PageLoader />;

  if (isError || policiesError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { name } = data;

  // calculate total policies posted
  const policiesLength = policies.length;

  // filter policy by author name
  const myPolicies = policies.filter((item) => item.authorName === name);

  const myPoliciesLength = myPolicies.length;

  return (
    <div className="user-route">
      <h3>Welcome {name}</h3>
      <div>
        <div>
          policies: <span>{policiesLength}</span>
        </div>
        <div>
          My policies: <span>{myPoliciesLength}</span>
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

          <li>
            <Link to="/createPolicy">
              <div>Policy</div>
              <MdOutlinePolicy />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Government;

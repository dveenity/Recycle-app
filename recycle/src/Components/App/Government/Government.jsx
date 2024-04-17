import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchPolicies } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import { FcCollaboration } from "react-icons/fc";
import { MdOutlinePolicy } from "react-icons/md";
import PropTypes from "prop-types";

const Government = ({ userItems }) => {
  const name = userItems[0];

  const {
    data: policies,
    isLoading: policiesLoading,
    isError: policiesError,
  } = useQuery("policy", fetchPolicies);

  if (policiesLoading) return <PageLoader />;

  if (policiesError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

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
          <li>
            <Link to="/viewPolicy">
              Policies
              <MdOutlinePolicy />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Government.propTypes = {
  userItems: PropTypes.array.isRequired,
};

export default Government;

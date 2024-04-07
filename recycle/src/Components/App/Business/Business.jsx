import { Link } from "react-router-dom";
import { fetchUser } from "../../Hooks/useFetch";
import { useQuery } from "react-query";
import PageLoader from "../../Animations/PageLoader";
import { FcCollaboration } from "react-icons/fc";

const Business = () => {
  const { data, isLoading, isError } = useQuery("user", fetchUser);

  if (isLoading) return <PageLoader />;

  if (isError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { name } = data;

  return (
    <div className="user-route">
      <h3>Welcome {name}</h3>
      <div>
        <div>
          Collaborations: <span>{10}</span>
        </div>
      </div>
      <div>
        <h3>dashboard</h3>
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

export default Business;

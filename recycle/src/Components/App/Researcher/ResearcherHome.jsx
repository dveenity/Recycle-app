import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchPDF } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import { FaCloudUploadAlt, FaDatabase } from "react-icons/fa";
import { FcCollaboration } from "react-icons/fc";
import PropTypes from "prop-types";

const ResearcherHome = ({ userItems }) => {
  const name = userItems;

  const {
    data: research,
    isLoading: researchLoading,
    isError: researchError,
  } = useQuery("PDF", fetchPDF);

  if (researchLoading) return <PageLoader />;

  if (researchError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  // calculate total research posted
  const researches = research.length;

  // filter only user researches
  const myResearches = research.filter((item) => item.authorName === name);

  const myResearchesLength = myResearches.length;

  return (
    <div className="user-route">
      <h3>Welcome {name}</h3>
      <div>
        <div>
          Researches: <span>{researches}</span>
        </div>
        <div>
          My Researches: <span>{myResearchesLength}</span>
        </div>
      </div>
      <div>
        <h3>Dashboard</h3>
        <ul>
          <li>
            <Link to="/dataUpload">
              <div>Data</div>
              <FaCloudUploadAlt />
            </Link>
          </li>
          <li>
            <Link to="/dataAccess">
              <div>DB</div>
              <FaDatabase />
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
    </div>
  );
};

ResearcherHome.propTypes = {
  userItems: PropTypes.array.isRequired,
};

export default ResearcherHome;

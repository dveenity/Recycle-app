import Logout from "../Custom/Logout";
import PageLoader from "../Animations/PageLoader";
import { fetchUser } from "../Hooks/useFetch";
import { useQuery } from "react-query";
import Role from "../Authentication/Role";
import AdminHome from "./Admin/AdminHome";
import ResearcherHome from "./Researcher/ResearcherHome";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlinePolicy } from "react-icons/md";
import Nav from "./Navigation/Nav";
import Logo from "../../assets/images/recycle.webp";
import Business from "./Business/Business";
import Government from "./Government/Government";
import { Link } from "react-router-dom";
import User from "./User/User";
import { FaQuestion } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const Home = () => {
  const [navBar, setNavBar] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery("user", fetchUser);

  if (isError) {
    // logout if error
    return (
      <div className="errorFetch">
        Error fetching data <Logout /> and try again
      </div>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  const { role, _id } = data;

  // toggle NavBar
  const toggleNav = () => {
    setNavBar((prevView) => !prevView);
  };

  // define props
  const toggleRoute = [{ routeLink: "/profile" }, { routeName: "Profile" }];

  return (
    <div className="home-main">
      <div>
        {role !== "choose" && (
          <div className="header">
            <img src={Logo} />
            <button onClick={toggleNav}>
              <RxHamburgerMenu />
            </button>
            {(role === "general-public" || role === "admin") && (
              <Link to="/notifications" className="link-one">
                <IoMdNotificationsOutline />
              </Link>
            )}
            <Link to={toggleRoute[0].routeLink} className="link-two">
              {toggleRoute[1].routeName}
            </Link>
          </div>
        )}

        {role === "choose" && <Role userId={[_id, refetch]} />}
        {navBar && <Nav toggleRoute={[toggleRoute, toggleNav]} />}
        {role === "admin" && <AdminHome />}
        {role === "general-public" && <User />}
        {role === "researcher" && <ResearcherHome />}
        {role === "business" && <Business />}
        {role === "policy-maker" && <Government />}
      </div>
      <div className="page-end">
        <Link to="/viewPolicy">
          Policies
          <MdOutlinePolicy />
        </Link>
        {role === "general-public" && (
          <Link to="/faq-and-support">
            FAQ
            <FaQuestion />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;

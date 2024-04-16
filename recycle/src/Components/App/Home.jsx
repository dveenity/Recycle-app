import Logout from "../Custom/Logout";
import PageLoader from "../Animations/PageLoader";
import { fetchNotifications, fetchUser } from "../Hooks/useFetch";
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
  const {
    data: notificationData,
    isLoading: notificationLoading,
    isError: notificationError,
  } = useQuery("notifications", fetchNotifications);

  if (isError || notificationError) {
    // logout if error
    return (
      <div className="errorFetch">
        Error fetching data <Logout /> and try again
      </div>
    );
  }

  if (isLoading || notificationLoading) {
    return <PageLoader />;
  }

  const { role, _id, name } = data;

  // fetch all notifications for admin
  const adminNotifications = notificationData;

  // Filter notifications by the user's name
  const userNotifications = notificationData.filter(
    (item) => item.messageOwner === name
  );

  // filter unread messages and get length for admin
  const unreadAdminNotifications = notificationData.filter(
    (notification) => notification.adminMessage.status === "unread"
  );
  const unreadAdminCount = unreadAdminNotifications.length;

  // filter unread messages and get length for general public
  const unreadGeneralPublicNotifications = notificationData.filter(
    (notification) => notification.userMessage?.status === "unread"
  );
  const unreadUserCount = unreadGeneralPublicNotifications.length;

  // send unread notifications counts as props to nav component
  const unreadCounts = [{ unreadAdminCount }, { unreadUserCount }];

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
            <div className="header-div">
              <img src={Logo} />
              <h1>Recycliv</h1>
            </div>
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

        {/* DISPLAY A ROUTE TO CHOOSE ROLE YOU WANNA REGISTER */}
        {role === "choose" && <Role userId={[_id, refetch]} />}
        {/* CONDITIONALLY RENDER NAV BAR ON CLICK */}
        {navBar && (
          <Nav toggleRoute={[toggleRoute, toggleNav, unreadCounts, role]} />
        )}
        {/* RENDER PAGES BASED ON SELECTED ROLE */}
        {role === "admin" && (
          <AdminHome userItems={[name, adminNotifications]} />
        )}
        {role === "general-public" && (
          <User userItems={[name, userNotifications]} />
        )}
        {role === "researcher" && <ResearcherHome userItems={[name]} />}
        {role === "business" && <Business userItems={[name]} />}
        {role === "policy-maker" && <Government userItems={[name]} />}
      </div>
      <div className="page-end">
        {role === "policy-maker" && (
          <Link to="/viewPolicy">
            Policies
            <MdOutlinePolicy />
          </Link>
        )}
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

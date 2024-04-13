import { useState } from "react";
import Nav from "../Navigation/Nav";
import { RxHamburgerMenu } from "react-icons/rx";
import { useQuery } from "react-query";
import { fetchUser } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import ButtonLoad from "../../Animations/ButtonLoad";
import Logout from "../../Custom/Logout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const serVer = `https://recycle-app-backend.vercel.app`;

const Profile = () => {
  const [navBar, setNavBar] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [userId, setUserId] = useState(null);
  const [result, setResult] = useState(null);
  const [submitBtn, setSubmitBtn] = useState("Update");

  // fetch user details
  const { data, isLoading, isError, refetch } = useQuery("user", fetchUser);

  // Form initialization using React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  if (isLoading) return <PageLoader />;

  if (isError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { name, role, email, _id } = data;

  // toggle NavBar
  const toggleNav = () => {
    setNavBar((prevView) => !prevView);
  };

  //   pass props to nav bar
  const toggleRoute = [{ routeLink: "/home" }, { routeName: "Home" }];

  // toggle edit box
  const toggleEditBox = (Id) => {
    // toggle box
    setEditBox((prevView) => !prevView);
    // send userId to state
    setUserId(Id);

    // Set initial form values
    setValue("name", name);
    setValue("role", role);
    setValue("email", email);
  };

  // close edit box
  const closeBox = () => {
    setEditBox(false);
  };

  // update profile
  const onSubmit = async (formData) => {
    setSubmitBtn(<ButtonLoad />);
    const { name, email } = formData;

    try {
      const res = await axios.put(`${serVer}/update-profile/${userId}`, {
        name,
        email,
      });

      const { data } = res;

      setResult(data);
      await refetch();
      closeBox();
    } catch (error) {
      setResult(error.response.data);
    } finally {
      setTimeout(() => {
        setResult(null);
      }, 3000);

      setSubmitBtn("Update");
    }
  };

  return (
    <div className="profile">
      <div className="header">
        <h2>Profile</h2>
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
      {navBar && <Nav toggleRoute={[toggleRoute, toggleNav]} />}
      <div className="profile-details">
        <div>
          Name: <span>{name}</span>
        </div>
        <div>
          Role: <span>{role}</span>
        </div>
        <div>
          Email: <span>{email}</span>
        </div>
        {role !== "admin" && (
          <button onClick={() => toggleEditBox(_id)}>Edit Profile</button>
        )}
      </div>
      {editBox && (
        <div className="floating-div">
          <h3>Edit your profile</h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <input type="text" {...register("name", { required: true })} />
              {errors.name && <p>Name is required</p>}
            </div>
            <div>
              <input type="email" {...register("email", { required: true })} />
              {errors.email && <p>Email is required</p>}
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                {submitBtn}
              </button>
              <button onClick={closeBox}>Close</button>
            </div>
          </form>
        </div>
      )}
      <p className="error-p">{result}</p>
      <Logout />
    </div>
  );
};

export default Profile;

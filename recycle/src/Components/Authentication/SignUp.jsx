import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

import ButtonLoad from "../Animations/ButtonLoad";

//import react hook form for handling the form
import { useForm } from "react-hook-form";

//axios to post form data
import axios from "axios";
import Logo from "../../assets/images/recycle.webp";

import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const serVer = `https://recycle-app-backend.vercel.app`;
const SignUp = () => {
  // react form
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const [send, setSend] = useState("Sign Up");
  // State to store and display result data
  const [resultMessage, setResultMessage] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const onSubmit = async (data) => {
    const url = `${serVer}/register`;

    // Reset error messages
    setResultMessage("");

    setIsLoading(true);
    setSend(<ButtonLoad />);

    const { name, email, password } = data;

    try {
      const result = await axios.post(url, {
        name,
        email,
        password,
      });

      if (result.status === 200) {
        // Save the user to local storage
        localStorage.setItem("recycle-users", result.data);

        // Update the auth Context
        dispatch({ type: "LOGIN", payload: result });
      } else {
        // Handle other scenarios or display the actual error message received from the server
        setResultMessage("Invalid server response, please try again");
      }
    } catch (error) {
      setResultMessage(error.response.data);
    } finally {
      // Hide the message after 2 seconds
      setTimeout(() => {
        setResultMessage("");
      }, 2000);

      setIsLoading(false);
      setSend("Sign Up");
    }
  };

  const onError = () => {
    setResultMessage("Failed to submit, check inputs and try again");

    // Hide the message after 2 seconds
    setTimeout(() => {
      setResultMessage("");
    }, 2000);
  };

  //password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="authentication">
      <div className="auth-text">
        <img src={Logo} />
        <h1>Welcome to Recycliv</h1>
      </div>
      <div className="authentication-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="inputBox">
            <input
              type="text"
              placeholder="Full Name"
              required
              id="name"
              {...register("name", { required: "Full Name is required" })}
            />
            <p>{errors.name?.message}</p>
          </div>

          <div className="inputBox">
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            <p>{errors.email?.message}</p>
          </div>
          {/* Password input */}
          <div className="inputBox">
            <input
              placeholder="Password"
              required
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {/* Toggle password visibility button */}
            <div
              className="toggle"
              type="button"
              onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaRegEyeSlash /> : <FaEye />}
            </div>
            <p>{errors.password?.message}</p>
          </div>

          <button type="submit" disabled={isSubmitting || isLoading}>
            {send}
          </button>
        </form>
        <p className="error-p">{resultMessage}</p>
        <div className="sign-log">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

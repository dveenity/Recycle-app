import axios from "axios";
import { useState } from "react";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import ButtonLoad from "../../Animations/ButtonLoad";

const serVer = `https://recycle-app-backend.vercel.app/`;
const token = localStorage.getItem("recycle-users");

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState("");
  const [feedbackBtn, setFeedbackBtn] = useState("Submit Feedback");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    setFeedbackBtn(<ButtonLoad />);
    e.preventDefault();

    try {
      const res = await axios.post(
        `${serVer}/submit-feedback`,
        { feedback },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data } = res;

      setResult(data.message);

      // clean the input area
      setFeedback("");
    } catch (error) {
      setResult(error.response.data.message);
    } finally {
      setTimeout(() => {
        setResult("");
      }, 3000);
    }

    setFeedbackBtn("Submit Feedback");
  };

  // Function to handle changes in the feedback input
  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div className="feedback">
      <HeaderGoBack h1="Feedback" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="feedback">Your Feedback</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={handleChange}
          required></textarea>
        <button type="submit">{feedbackBtn}</button>
      </form>
      <p className="error-p">{result}</p>
    </div>
  );
};

export default Feedback;

import { useState } from "react";
import axios from "axios";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import ButtonLoad from "../../Animations/ButtonLoad";
import { FaRecycle } from "react-icons/fa";
import Sliding from "../Sliding";
import PageLoader from "../../Animations/PageLoader";
import { useQuery } from "react-query";
import { fetchUser } from "../../Hooks/useFetch";

const serVer = `https://recycle-app-backend.vercel.app`;

const BusinessRecycle = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("");
  const [recycleBtn, setRecycleBtn] = useState(<FaRecycle />);

  //  fetch user data
  const { data, isLoading, isError } = useQuery("user", fetchUser);

  if (isLoading) return <PageLoader />;

  if (isError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { role } = data;

  //get token
  const token = localStorage.getItem("recycle-users");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecycleBtn(<ButtonLoad />);
    let points = 0;

    // Calculate points based on the selected item and weight
    if (selectedItem === "paper") {
      points = weight * 3000; // Assign 300 points per 0.1 ton for paper
    } else if (selectedItem === "plastic") {
      points = weight * 5000; // Assign 500 points per 0.1 ton for plastic
    } else if (selectedItem === "glass") {
      points = weight * 6000; // Assign 600 points per 0.1 ton for glass
    } else if (selectedItem === "batteries") {
      points = weight * 8000; // Assign 800 points per 0.1 ton for batteries
    } else if (selectedItem === "metal") {
      points = weight * 10000; // Assign 1000 points per 0.1 ton for metal
    }

    if (weight < 0.1 || weight > 1) {
      setResult("Sorry you can only recycle between 0.1 to 1 ton");

      setTimeout(() => {
        setResult("");
        setRecycleBtn(<FaRecycle />);
      }, 2000);
    } else {
      try {
        const res = await axios.post(
          `${serVer}/newRecycleItem`,
          { selectedItem, weight, pointsEarned: points, role },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = res;

        setResult(data.message);

        // reset input
        setWeight("");
        setSelectedItem("");
      } catch (error) {
        setResult(error.response.data.message);
      } finally {
        setTimeout(() => {
          setResult("");
        }, 3000);

        setRecycleBtn(<FaRecycle />);
      }
    }
  };

  return (
    <div className="recycle">
      <HeaderGoBack h1="Recycle an Item" />
      <div>
        <form onSubmit={handleSubmit}>
          <select
            required
            id="items"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}>
            <option value="" disabled>
              Select an item
            </option>
            <option value="paper">Paper</option>
            <option value="plastic">Plastic</option>
            <option value="glass">Glass</option>
            <option value="batteries">Batteries</option>
            <option value="metal">Metal</option>
          </select>
          <input
            required
            type="number"
            placeholder="Weight in ton(s)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button type="submit">{recycleBtn}</button>
        </form>
      </div>
      <Sliding />
      {result && <p className="error-p">{result}</p>}
    </div>
  );
};

export default BusinessRecycle;

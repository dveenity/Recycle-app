import { useState } from "react";
import axios from "axios";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import ButtonLoad from "../../Animations/ButtonLoad";
import { FaRecycle } from "react-icons/fa";

const serVer = `https://recycle-app-backend.vercel.app`;

const Recycle = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("");
  const [recycleBtn, setRecycleBtn] = useState(<FaRecycle />);

  //get token
  const token = localStorage.getItem("recycle-users");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    setRecycleBtn(<ButtonLoad />);
    e.preventDefault();
    let points = 0;

    // Calculate points based on the selected item and weight
    if (selectedItem === "paper") {
      points = weight * 3; // Assign 5 points per gram for paper
    } else if (selectedItem === "plastic") {
      points = weight * 5; // Assign 3 points per gram for plastic
    } else if (selectedItem === "glass") {
      points = weight * 6; // Assign 4 points per gram for glass
    } else if (selectedItem === "batteries") {
      points = weight * 8; // Assign 8 points per gram for batteries
    } else if (selectedItem === "metal") {
      points = weight * 10; // Assign 10 points per gram for metal
    }

    try {
      const res = await axios.post(
        `${serVer}/newRecycleItem`,
        { selectedItem, weight, pointsEarned: points },
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
            placeholder="Weight in grams"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button type="submit">{recycleBtn}</button>
        </form>
      </div>
      {result && <p className="error-p">{result}</p>}
    </div>
  );
};

export default Recycle;

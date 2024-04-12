import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types"; // Correct import
import ButtonLoad from "../Animations/ButtonLoad";

const serVer = `https://recycle-app-backend.vercel.app`;

const Role = ({ userId }) => {
  // Destructure _id and refetch from userId prop
  const [_id, refetch] = userId;

  // Define states
  const [role, setRole] = useState("");
  const [selectButton, setSelectButton] = useState("Select Role");
  const [result, setResult] = useState("");
  const [showConsent, setShowConsent] = useState(false); // State to toggle consent disclaimer

  // Define roles
  const roles = [
    "select role",
    "general-public",
    "researcher",
    "business",
    "policy-maker",
  ];

  // Handle change event
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);

    // Toggle consent disclaimer based on selected role
    if (selectedRole === "business") {
      setShowConsent(true);
    } else {
      setShowConsent(false);
    }
  };

  // Update Role function
  const updateRole = async () => {
    setSelectButton(<ButtonLoad />); // Set selectButton state to JSX

    try {
      await axios.put(`${serVer}/updateRole/${_id}`, { role });
      // refetch to update page
      refetch();
    } catch (error) {
      setResult("Failed to update Role");
    } finally {
      setSelectButton("Select Role"); // Set selectButton state back to string

      setTimeout(() => {
        setResult("");
      }, 3000);
    }
  };

  return (
    <div className="role-auth">
      <div></div>
      <h2>What role are you registering for ?</h2>
      <div>
        <select onChange={handleRoleChange}>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button onClick={updateRole}>{selectButton}</button>
      </div>
      {showConsent && (
        <div className="consent-disclaimer">
          <p>
            By selecting the business role, you agree to share your business
            data with other businesses who are also looking to collaborate on
            recycling initiatives within this platform.
          </p>
        </div>
      )}
      <div>{result}</div>
    </div>
  );
};

Role.propTypes = {
  userId: PropTypes.array.isRequired, // Correct PropTypes import
};

export default Role;

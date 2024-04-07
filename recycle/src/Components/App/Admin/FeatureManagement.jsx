import { useState } from "react";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import "./btn.css";

// Custom Toggle Button Component
const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
};

const FeatureManagement = () => {
  const features = [
    { name: "User Authentication", active: true },
    { name: "Recycling Item Catalog", active: true },
    { name: "Recycling Points System", active: true },
    { name: "Recycling Challenges", active: true },
    { name: "Recycling Statistics", active: true },
    { name: "Education Resources", active: true },
    { name: "Recycling Reminders", active: true },
    { name: "Social Sharing", active: true },
    { name: "Community Forums", active: true },
    { name: "Recycling Events Calendar", active: true },
    { name: "Recycling Guides", active: true },
    { name: "Barcode Scanner", active: true },
    { name: "Leaderboards", active: true },
    { name: "Feedback and Suggestions", active: true },
    { name: "Dark Mode", active: true },
    { name: "Language Support", active: true },
    { name: "Accessibility Features", active: true },
    { name: "Offline Support", active: true },
    { name: "Admin Dashboard", active: true },
  ];

  return (
    <div className="features">
      <HeaderGoBack h1="Feature Management" />
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index}>
            <span>{feature.name}</span>
            <ToggleButton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureManagement;

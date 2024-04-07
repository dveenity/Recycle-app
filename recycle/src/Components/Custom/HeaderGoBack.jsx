import PropTypes from "prop-types";
import GoBack from "./GoBack";

const HeaderGoBack = ({ h1 }) => {
  return (
    <div className="headerGoBack">
      <GoBack />
      <h2>{h1}</h2>
      <div></div>
    </div>
  );
};

HeaderGoBack.propTypes = {
  h1: PropTypes.string.isRequired,
};

export default HeaderGoBack;

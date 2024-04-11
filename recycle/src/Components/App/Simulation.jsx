import HeaderGoBack from "../Custom/HeaderGoBack";
import Sliding from "./Sliding";

const Simulation = () => {
  return (
    <div className="video-container">
      <HeaderGoBack h1="Simulation" />
      <div>
        <video controls>
          <source src="path_to_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-options">
          <a href="path_to_video.mp4" download>
            Download
          </a>
          {/* Add additional links for streaming if desired */}
        </div>
      </div>
      <Sliding />
    </div>
  );
};

export default Simulation;

import HeaderGoBack from "../../Custom/HeaderGoBack";

const Metrics = () => {
  return (
    <div className="metrics-container">
      <HeaderGoBack h1="Recycling Metrics" />
      <div className="grid">
        <div className="card">
          <h2 className="subtitle">Points Earned Per Gram</h2>
          <p>
            Earn points by recycling different materials. Here&apos;s how many
            points you can earn per gram:
          </p>
          <ul>
            <li>
              <span>Paper:</span> 3 points/gram
            </li>
            <li>
              <span>Plastic:</span> 5 points/gram
            </li>
            <li>
              <span>Glass:</span> 6 points/gram
            </li>
            <li>
              <span>Batteries:</span> 8 points/gram
            </li>
            <li>
              <span>Metal:</span> 10 points/gram
            </li>
          </ul>
        </div>
        <div className="card">
          <h2 className="subtitle">Other Metrics</h2>
          <p>
            Here are some other metrics to consider for our recycling web app:
          </p>
          <ul>
            <li>
              <span>Total Users:</span> 500
            </li>
            <li>
              <span>Total Recycled Items:</span> 2000
            </li>
            <li>
              <span>Average Points Earned per User:</span> 150
            </li>
            {/* Add more metrics as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Metrics;

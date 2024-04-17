import HeaderGoBack from "../../Custom/HeaderGoBack";

const BusinessMetrics = () => {
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
              <span>Paper:</span> 300 points/0.1 tons
            </li>
            <li>
              <span>Plastic:</span> 500 points/0.1 tons
            </li>
            <li>
              <span>Glass:</span> 600 points/0.1 tons
            </li>
            <li>
              <span>Batteries:</span> 800 points/0.1 tons
            </li>
            <li>
              <span>Metal:</span> 1000 points/0.1 tons
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
              <span>Average Points Earned per User:</span> 1500
            </li>
            {/* Add more metrics as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessMetrics;

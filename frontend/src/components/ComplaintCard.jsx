import { Link } from "react-router-dom";

import "../styles/ComplaintCard.css";

function ComplaintCard({ complaint }) {

  return (
    <div className="card">

      <img
        src={complaint.image}
        alt="Garbage"
      />

      <div className="card-content">

        <h3>
          {complaint.location}
        </h3>

        <p>
          {complaint.description}
        </p>

        <p className="status">
          Status: {complaint.status}
        </p>

        <Link to={`/complaint/${complaint._id}`}>

          <button
            style={{
              marginTop: "10px",
              padding: "8px 15px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View Details
          </button>

        </Link>

      </div>

    </div>
  );
}

export default ComplaintCard;
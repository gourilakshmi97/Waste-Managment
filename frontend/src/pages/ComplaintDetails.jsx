import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import complaints from "../data/complaints";

function ComplaintDetails() {

  const { id } = useParams();

  // Find complaint using ID

  const complaint = complaints.find(
    (item) => item.id === Number(id)
  );

  if (!complaint) {
    return <h1>Complaint Not Found</h1>;
  }

  return (
    <div>

      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >

        <h1>
          Complaint Details
        </h1>

        <img
          src={complaint.image}
          alt="Garbage"
          style={{
            width: "400px",
            borderRadius: "10px",
          }}
        />

        <h2>
          {complaint.location}
        </h2>

        <p>
          {complaint.description}
        </p>

        <h3>
          Status: {complaint.status}
        </h3>

      </div>

    </div>
  );
}

export default ComplaintDetails;
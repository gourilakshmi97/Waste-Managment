import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ComplaintCard from "../components/ComplaintCard";

import API from "../services/api";

function Home() {

  const [complaints, setComplaints] =
    useState([]);

  // Fetch complaints

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const response = await API.get(
        "/complaints"
      );

      setComplaints(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div>

      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>
          Latest Garbage Reports
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >

          {complaints.map((item) => (

            <ComplaintCard
              key={item._id}
              complaint={item}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;
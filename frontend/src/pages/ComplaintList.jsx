import Navbar from "../components/Navbar";
import ComplaintCard from "../components/ComplaintCard";

import complaints from "../data/complaints";

function ComplaintList() {

  return (
    <div>

      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>
          All Complaints
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >

          {complaints.map((item) => (

            <ComplaintCard
              key={item.id}
              complaint={item}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default ComplaintList;
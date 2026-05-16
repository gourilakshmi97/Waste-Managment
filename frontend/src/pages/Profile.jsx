import Navbar from "../components/Navbar";

import complaints from "../data/complaints";

import "../styles/Profile.css";

function Profile() {

  // Dummy user data

  const user = {

    name: "Arun Kumar",

    email: "arun@gmail.com",

    phone: "9876543210",

    address: "Kochi, Kerala",

  };

  return (
    <div>

      <Navbar />

      <div className="profile-container">

        <div className="profile-box">

          {/* User Info */}

          <div className="user-info">

            <h1>
              User Profile
            </h1>

            <p>
              <strong>Name:</strong>
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>
              {user.email}
            </p>

            <p>
              <strong>Phone:</strong>
              {user.phone}
            </p>

            <p>
              <strong>Address:</strong>
              {user.address}
            </p>

            <p>
              <strong>Total Complaints:</strong>
              {complaints.length}
            </p>

            <button className="edit-btn">
              Edit Profile
            </button>

          </div>

          {/* Complaint History */}

          <div className="history-box">

            <h2>
              Complaint History
            </h2>

            {complaints.map((item) => (

              <div
                key={item.id}

                className="complaint-item"
              >

                <h3>
                  {item.location}
                </h3>

                <p>
                  {item.description}
                </p>

                <p>
                  Status:
                  {item.status}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
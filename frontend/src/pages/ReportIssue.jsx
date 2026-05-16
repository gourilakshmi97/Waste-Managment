import { useState } from "react";

import Navbar from "../components/Navbar";
import MapPicker from "../components/MapPicker";
import API from "../services/api";

import "../styles/ReportIssue.css";

function ReportIssue() {

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [selectedPosition, setSelectedPosition] =
    useState(null);

  // Handle image upload

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);

    // Image preview

    setPreview(URL.createObjectURL(file));
  };

  // Handle form submit
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append(
      "description",
      description
    );

    formData.append(
      "location",
      location
    );

    formData.append(
      "image",
      image
    );

    formData.append(
      "latitude",
      selectedPosition?.lat
    );

    formData.append(
      "longitude",
      selectedPosition?.lng
    );

    const response = await API.post(
      "/complaints",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    alert("Complaint Submitted");

  } catch (error) {

    console.log(error);

    alert("Submission Failed");
  }
};
  return (
    <div>

      <Navbar />

      <div className="report-container">

        <div className="report-box">

          <h1>
            Report Garbage Issue
          </h1>

          <form onSubmit={handleSubmit}>

            {/* Description */}

            <textarea
              placeholder="Enter issue description"

              rows="5"

              value={description}

              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            {/* Location */}

            <input
              type="text"

              placeholder="Enter Location"

              value={location}

              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

            {/* Image Upload */}

            <input
              type="file"

              accept="image/*"

              onChange={handleImageChange}
            />

            {/* Image Preview */}

            {preview && (

              <img
                src={preview}

                alt="Preview"

                className="preview-image"
              />

            )}

            {/* Map */}

            <MapPicker
              setSelectedPosition={
                setSelectedPosition
              }
            />

            {/* Coordinates */}

            {selectedPosition && (

              <div
                style={{
                  marginTop: "15px",
                }}
              >

                <h3>
                  Selected Coordinates
                </h3>

                <p>
                  Latitude:
                  {selectedPosition.lat}
                </p>

                <p>
                  Longitude:
                  {selectedPosition.lng}
                </p>

              </div>

            )}

            <button type="submit">
              Submit Complaint
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ReportIssue;
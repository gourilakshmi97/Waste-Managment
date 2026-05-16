import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import { useState } from "react";

function LocationMarker({ setSelectedPosition }) {

  const [position, setPosition] = useState(null);

  useMapEvents({

    click(e) {

      setPosition(e.latlng);

      setSelectedPosition(e.latlng);
    },

  });

  return position ? (
    <Marker position={position}></Marker>
  ) : null;
}

function MapPicker({ setSelectedPosition }) {

  return (
    <MapContainer
      center={[10.8505, 76.2711]}
      zoom={7}

      style={{
        height: "400px",
        width: "100%",
        marginTop: "20px",
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        setSelectedPosition={setSelectedPosition}
      />

    </MapContainer>
  );
}

export default MapPicker;
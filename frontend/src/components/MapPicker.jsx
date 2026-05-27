import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography
} from "@mui/material";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";

import {
  GeoSearchControl,
  OpenStreetMapProvider
} from "leaflet-geosearch";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import L from "leaflet";


// FIX LEAFLET DEFAULT ICONS
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


// SEARCH CONTROL
function SearchField({
  setLatitude,
  setLongitude,
  setLocation
}) {

  const map = useMap();

  useEffect(() => {

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: false,
      showPopup: false,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {

      const lat = result.location.y;
      const lng = result.location.x;

      setLatitude(lat);
      setLongitude(lng);
      setLocation(result.location.label);

      map.setView([lat, lng], 15);

    });

    return () => {
      map.removeControl(searchControl);
    };

  }, [map]);

  return null;
}


// CLICK HANDLER
function LocationMarker({
  setLatitude,
  setLongitude,
  setLocation
}) {

  const [position, setPosition] = useState(null);

  useMapEvents({

    click(e) {

      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setPosition([lat, lng]);

      setLatitude(lat);
      setLongitude(lng);

      setLocation(
        `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      );
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        Selected Complaint Location
      </Popup>
    </Marker>
  ) : null;
}


export default function MapPicker({
  setLatitude,
  setLongitude,
  setLocation
}) {

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #d1fae5",
        background:
          "linear-gradient(to bottom, #ffffff, #f0fdf4)"
      }}
    >

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          mb: 2,
          color: "#047857"
        }}
      >
        Select Waste Location
      </Typography>

      <Box
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "2px solid #bbf7d0"
        }}
      >

        <MapContainer
          center={[10.5276, 76.2144]}
          zoom={13}
          style={{
            height: "450px",
            width: "100%"
          }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <SearchField
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setLocation={setLocation}
          />

          <LocationMarker
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setLocation={setLocation}
          />

        </MapContainer>

      </Box>
    </Paper>
  );
}
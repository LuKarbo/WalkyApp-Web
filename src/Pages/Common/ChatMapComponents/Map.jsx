import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import { useState } from "react";


const containerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: -34.6037, // Ejemplo: Buenos Aires
  lng: -58.3816
};

export default function Map() {
  const [path, setPath] = useState(() => {
    // Recuperar del localStorage si existe
    const saved = localStorage.getItem("zona");
    return saved ? JSON.parse(saved) : [];
  });

  const handleClick = (event) => {
    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const newPath = [...path, newPoint];
    setPath(newPath);
    localStorage.setItem("zona", JSON.stringify(newPath));
  };

  //generamos el componente pero falta que google nos habilite la API para que funcione correctamente
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleClick}
      >
        <Polygon
          paths={path}
          options={{
            fillColor: "#2196f3",
            fillOpacity: 0.2,
            strokeColor: "#2196f3",
            strokeOpacity: 0.7,
            strokeWeight: 2,
            clickable: false,
            draggable: false,
            editable: false,
            geodesic: false
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};


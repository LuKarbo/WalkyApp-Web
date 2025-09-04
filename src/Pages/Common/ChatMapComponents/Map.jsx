import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -34.6037, // Buenos Aires
  lng: -58.3816,
};

export default function Map() {
  const [path, setPath] = useState(() => {
    const saved = localStorage.getItem("zona");
    return saved ? JSON.parse(saved) : [];
  });

  // Calcular el centro de la zona si existe
  const mapCenter = path.length
    ? {
        lat: path.reduce((sum, p) => sum + p.lat, 0) / path.length,
        lng: path.reduce((sum, p) => sum + p.lng, 0) / path.length,
      }
    : defaultCenter;

  const handleClick = (event) => {
    if (path.length >= 4) return; // máximo 4 puntos
    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const newPath = [...path, newPoint];
    setPath(newPath);
    localStorage.setItem("zona", JSON.stringify(newPath));
  };

  const clearPath = () => {
    setPath([]);
    localStorage.removeItem("zona");
  };

  return (
    <div className="w-full">
      {/* Botón para limpiar */}
      <div className="mb-2">
        <button
          onClick={clearPath}
          className="bg-danger text-black px-3 py-1 rounded-md hover:bg-foreground"
        >
          Borrar zona
        </button>
      </div>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter} // 👈 aquí usamos el centro calculado
          zoom={13}
          onClick={handleClick}
        >
          <Polygon
            paths={path}
            options={{
              fillColor: "#f87171d",
              fillOpacity: 0.2,
              strokeColor: "#00000",
              strokeOpacity: 0.7,
              strokeWeight: 5,
              clickable: false,
              draggable: false,
              editable: false,
              geodesic: false,
            }}
          />

          {/* Marcadores numerados */}
          {path.map((point, index) => (
            <Marker
              key={index}
              position={point}
              label={{
                text: `${index + 1}`, // número del punto
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
